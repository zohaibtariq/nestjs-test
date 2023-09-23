import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseFilters, UseGuards, Req } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { DuplicateKeyExceptionFilter } from '../exceptions/duplicate-key.filter';
import { Types } from "mongoose";
import { AccessTokenGuard } from "../common/guards/accessToken.guard";
import { Request } from "express";
import { AuthService } from "../auth/auth.service";
import { CreateFilmRatingDto } from "./dto/create-film-rating.dto";

@Controller('films')
export class FilmsController {

  constructor(
      private readonly filmsService: FilmsService,
      private readonly authService: AuthService
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UseFilters(DuplicateKeyExceptionFilter)
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.filmsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.filmsService.remove(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':filmId/rating')
  rating(@Req() req: Request, @Param('filmId') filmId: Types.ObjectId, @Body() filmRatingData: CreateFilmRatingDto) {
    const { userId} = this.authService.getRequestUser(req);
    return this.filmsService.rating(filmId, userId, filmRatingData);
  }
}
