import {Controller, Get, Post, Body, Patch, Put, Param, Delete, UseFilters, UseGuards} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DuplicateKeyExceptionFilter } from '../exceptions/duplicate-key.filter';
import {ObjectId, Types} from "mongoose";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UseFilters(DuplicateKeyExceptionFilter)
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.countriesService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.countriesService.remove(id);
  }
}
