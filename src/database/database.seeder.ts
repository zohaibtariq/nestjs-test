import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '../countries/dto/create-country.dto';
import { CountriesRepository } from '../countries/countries.repository';

@Injectable()
export class DatabaseSeeder {
  // IMPORTANT:  seeding of database can be done in many ways
  constructor(private readonly countriesRepository: CountriesRepository) {}

    async seedCountries() {
      const countries: CreateCountryDto[] = [
        {
            name: 'United Kingdom',
            iso: 'UK',
        },
        {
            name: 'United States Of America Updated',
            iso: 'USA',
        },
    ];

    for (const country of countries) {
      const existingCountry = await this.countriesRepository.findOne({
        iso: country.iso,
      });
      if (existingCountry) {
        await this.countriesRepository.findOneAndUpdate(
          { iso: country.iso },
          { $set: country },
        );
      } else {
        await this.countriesRepository.create(country);
      }
    }
  }
}
