import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { APP_FILTER } from "@nestjs/core";
import { DuplicateKeyExceptionFilter } from "../exceptions/duplicate-key.filter";
import {CountriesRepository} from "./countries.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Country.name,
        schema: CountrySchema,
      },
    ]),
  ],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    CountriesRepository,
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyExceptionFilter,
    },
  ],
  exports: [CountriesService, CountriesRepository],
})
export class CountriesModule {}
