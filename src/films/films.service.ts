import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ObjectId } from 'mongoose';
import { FilmDocument } from './schemas/film.schema';
import { FilmsRepository } from "./films.repository";

@Injectable()
export class FilmsService {

  constructor(
      private readonly filmsRepository: FilmsRepository
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<FilmDocument> {
    return this.filmsRepository.create(createFilmDto);
  }

  async findAll(): Promise<FilmDocument[]> {
    return this.filmsRepository.find({}, {password: 0});
  }

  findOne(id: ObjectId) {
    return this.filmsRepository.findById(id, {password: 0});
  }

  async update(
      id: ObjectId,
      updateFilmDto: UpdateFilmDto,
  ): Promise<FilmDocument> {
    return this.filmsRepository.findByIdAndUpdate(id, updateFilmDto, {new: true});
  }

  async remove(id: ObjectId) {
    return this.filmsRepository.findByIdAndRemove(id);
  }

}
