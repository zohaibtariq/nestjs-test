import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {ObjectId, Types} from 'mongoose';
import { CountryDocument } from './schemas/country.schema';
import { CountriesRepository } from "./countries.repository";

@Injectable()
export class CountriesService {

  constructor(
      private readonly countriesRepository: CountriesRepository
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<CountryDocument> {
    return this.countriesRepository.create(createCountryDto);
  }

  async findAll(): Promise<CountryDocument[]> {
    return this.countriesRepository.find({}, {__v: 0});
  }

  findOne(id: Types.ObjectId) {
    return this.countriesRepository.findById(id, {__v: 0});
  }

  async update(
      id: Types.ObjectId,
      updateCountryDto: UpdateCountryDto,
  ): Promise<CountryDocument> {
    return this.countriesRepository.findByIdAndUpdate(id, updateCountryDto, {new: true});
  }

  async remove(id: Types.ObjectId) {
    return this.countriesRepository.findByIdAndRemove(id);
  }

}
