import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { getModelToken } from "@nestjs/mongoose";
import { Country, CountrySchema } from "./schemas/country.schema";
import { connect, Connection, Model } from "mongoose";
import { CountryDTOStub } from "./dto/country.dto.stub";
import {CountriesRepository} from "./countries.repository";

describe('CountriesService', () => {
  let service: CountriesService;
  let mongoConnection: Connection;
  let countryModel: Model<Country>;

  beforeEach(async () => {
    mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    countryModel = mongoConnection.model(Country.name, CountrySchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        CountriesRepository,
        {provide: getModelToken(Country.name), useValue: countryModel},
      ],
    }).compile();
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return the saved object", async () => {
    const createdCountry = await service.create(CountryDTOStub());
    expect(createdCountry.name).toBe(CountryDTOStub().name);
    expect(createdCountry.iso).toBe(CountryDTOStub().iso);
  });

});
