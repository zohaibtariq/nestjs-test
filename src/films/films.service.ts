import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Types } from 'mongoose';
import { FilmDocument } from './schemas/film.schema';
import { FilmsRepository } from "./films.repository";
import { CreateFilmRatingDto } from "./dto/create-film-rating.dto";
import { FilmsRatingRepository } from "./films-rating.repository";
import { SearchService } from "../search/search.service";
import { ConfigService } from "@nestjs/config";
import FilmsIndex from "./utils/FilmsIndex";

@Injectable()
export class FilmsService implements OnModuleInit {

  constructor(
      private readonly filmsRepository: FilmsRepository,
      private readonly filmsRatingRepository: FilmsRatingRepository,
      private readonly searchService: SearchService,
      private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // IMPORTANT: execute once when app boots and create required index which is films in our case
    await this.searchService.createIndex({...FilmsIndex, index: this.configService.get('ELASTIC_SEARCH_INDEX')})
  }

  async create(createFilmDto: CreateFilmDto): Promise<FilmDocument> {
    const filmDoc = await this.filmsRepository.create(createFilmDto);
    // IMPORTANT: film create sync with search engine
    await this.searchService.createDocument(this.configService.get('ELASTIC_SEARCH_INDEX'), filmDoc.id, filmDoc)
    return filmDoc;
  }

  async findAll(): Promise<FilmDocument[]> {
    return this.filmsRepository.find({}, {password: 0});
  }

  findOne(id: Types.ObjectId) {
    return this.filmsRepository.findById(id, {password: 0});
  }

  async update(
      id: Types.ObjectId,
      updateFilmDto: UpdateFilmDto,
  ): Promise<FilmDocument> {
    const filmDoc = await this.filmsRepository.findByIdAndUpdate(id, updateFilmDto, {new: true});
    // IMPORTANT: film update sync with search engine
    await this.searchService.updateDocument(this.configService.get('ELASTIC_SEARCH_INDEX'), filmDoc.id, filmDoc)
    return filmDoc;
  }

  async remove(id: Types.ObjectId) {
    const filmDoc = await this.filmsRepository.findByIdAndRemove(id);
    // IMPORTANT: film delete sync with search engine
    await this.searchService.deleteDocument(this.configService.get('ELASTIC_SEARCH_INDEX'), id.toString())
    return filmDoc;
  }

  async rating(filmId: Types.ObjectId, userId: Types.ObjectId, filmRatingData: CreateFilmRatingDto) {

    filmId = new Types.ObjectId(filmId);
    userId = new Types.ObjectId(userId);

    await this.filmsRatingRepository.findOneAndUpdate({ filmId: filmId, userId: userId },{
      ...filmRatingData, filmId, userId }, { upsert: true, new: true })

    // IMPORTANT: this cane be done by two ways mentioned both used one
    let averageRating = await this.getAverageFilmRatingAggregate(filmId) // Aggregate Approach
    // let averageRating = await this.getAverageFilmRating(filmId, 'rating') // Model Approach

    const filmDoc = await this.filmsRepository.findByIdAndUpdate(filmId, {rating: averageRating}, {new: true});
    await this.searchService.updateDocument(this.configService.get('ELASTIC_SEARCH_INDEX'), filmDoc.id, filmDoc)
    return filmDoc;
  }

  async getAverageFilmRatingAggregate(filmId: Types.ObjectId): Promise<Number> {
    const aggregateResult = await this.filmsRatingRepository.aggregate(
        [
          {
            $match: {
              "filmId": filmId,
            },
          },
          {
            $group: {
              _id: null,
              totalRating: {
                $sum: '$rating',
              },
              count: {
                $sum: 1,
              },
            },
          },
        ]
    )
    let averageRating;
    if(aggregateResult.length > 0){
      const ratingSum = aggregateResult[0].totalRating
      const filmsCount = aggregateResult[0].count
      averageRating = parseFloat((ratingSum / filmsCount).toFixed(1))
    }
    return averageRating
  }

  async getAverageFilmRating(filmId: Types.ObjectId, columnName: string): Promise<Number> {
    const films = await this.filmsRatingRepository.findWithSelect({ filmId: filmId }, 'rating')
    let averageRating = 0;
    if (films.length > 0) {
      const sum = films.reduce((total, doc) => total + doc[columnName], 0);
      averageRating = parseFloat((sum / films.length).toFixed(1));
    }
    return averageRating
  }

}
