import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schemas/film.schema';
import { APP_FILTER } from "@nestjs/core";
import { DuplicateKeyExceptionFilter } from "../exceptions/duplicate-key.filter";
import { FilmsRepository } from "./films.repository";
import { AuthModule } from "../auth/auth.module";
import { FilmsRatingRepository } from "./films-rating.repository";
import { FilmRating, FilmRatingSchema } from "./schemas/film-rating.schema";
import {SearchModule} from "../search/search.module";
import {SearchService} from "../search/search.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
      {
        name: FilmRating.name,
        schema: FilmRatingSchema,
      },
    ]),
    AuthModule,
    SearchModule
  ],
  controllers: [FilmsController],
  providers: [
    SearchService,
    FilmsService,
    FilmsRepository,
    FilmsRatingRepository,
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyExceptionFilter,
    },
  ],
  exports: [FilmsService],
})
export class FilmsModule {}
