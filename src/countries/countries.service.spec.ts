import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Country, CountrySchema } from "./schemas/country.schema";
import { CountryDTOStub } from "./dto/country.dto.stub";
import { CountriesRepository } from "./countries.repository";

describe("CountriesController", () => {
  let controller: CountriesController;
  let mongoConnection: Connection;
  let countryModel: Model<Country>;

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        CountriesService,
        CountriesRepository,
        {provide: getModelToken(Country.name), useValue: countryModel},
      ],
    }).compile();
    controller = module.get<CountriesController>(CountriesController);
    mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    countryModel = mongoConnection.model(Country.name, CountrySchema);
  });

  it('CountriesController should be defined', () => {
    expect(controller).toBeDefined();
  });

});
