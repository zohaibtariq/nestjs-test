import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Country, CountrySchema } from "./schemas/country.schema";
import { CountryDTOStub } from "./dto/country.dto.stub";
import {CountriesRepository} from "./countries.repository";

describe("CountriesController", () => {

  let controller: CountriesController;
  let mongoConnection: Connection;

  let countryModel: Model<Country>;

  beforeAll(async () => {
    mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    countryModel = mongoConnection.model(Country.name, CountrySchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        CountriesService,
        CountriesRepository,
        {provide: getModelToken(Country.name), useValue: countryModel},
      ],
    }).compile();
    controller = module.get<CountriesController>(CountriesController);
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('CountriesController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should return the saved object", async () => {
    const createdCountry = await controller.create(CountryDTOStub());
    expect(createdCountry.name).toBe(CountryDTOStub().name);
    expect(createdCountry.iso).toBe(CountryDTOStub().iso);
  });

});