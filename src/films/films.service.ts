import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Types } from 'mongoose';
import { FilmDocument } from './schemas/film.schema';
import { FilmsRepository } from "./films.repository";
import { CreateFilmRatingDto } from "./dto/create-film-rating.dto";
import { FilmsRatingRepository } from "./films-rating.repository";

@Injectable()
export class FilmsService {

  constructor(
      private readonly filmsRepository: FilmsRepository,
      private readonly filmsRatingRepository: FilmsRatingRepository,
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<FilmDocument> {
    return this.filmsRepository.create(createFilmDto);
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
    return this.filmsRepository.findByIdAndUpdate(id, updateFilmDto, {new: true});
  }

  async remove(id: Types.ObjectId) {
    return this.filmsRepository.findByIdAndRemove(id);
  }

  async rating(filmId: Types.ObjectId, userId: Types.ObjectId, filmRatingData: CreateFilmRatingDto) {

    filmId = new Types.ObjectId(filmId);
    userId = new Types.ObjectId(userId);

    await this.filmsRatingRepository.findOneAndUpdate({ filmId: filmId, userId: userId },{
      ...filmRatingData, filmId, userId }, { upsert: true, new: true })

    let averageRating = await this.getAverageFilmRatingAggregate(filmId) // Aggregate Approach
    // let averageRating = await this.getAverageFilmRating(filmId, 'rating') // Model Approach

    const updated = await this.filmsRepository.findByIdAndUpdate(filmId, {rating: averageRating}, {new: true});

    return updated;
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
