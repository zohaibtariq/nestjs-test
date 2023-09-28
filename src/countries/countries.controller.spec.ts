import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Connection, connect, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { CountryDTOStub } from './dto/country.dto.stub';
import { CountriesRepository } from './countries.repository';

describe('CountriesController', () => {
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
        { provide: getModelToken(Country.name), useValue: countryModel },
      ],
    }).compile();
    controller = module.get<CountriesController>(CountriesController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    await countryModel.deleteMany({});
  });

  it('CountriesController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all countries', async () => {
    const countries = await controller.findAll();
    expect(countries).toBeDefined();
    expect(countries.length).toBeGreaterThanOrEqual(0);
  });

  it('should find a country by ID', async () => {
    const createdCountry = await countryModel.create(CountryDTOStub());
    const country = await controller.findOne(createdCountry._id);
    expect(country).toBeDefined();
    expect(country._id).toEqual(createdCountry._id);
  });

  it('should update a country by ID', async () => {
    const createdCountry = await countryModel.create(CountryDTOStub());
    const updatedData = { ...CountryDTOStub(), name: 'UpdatedCountryName' };
    const updatedCountry = await controller.update(createdCountry._id, updatedData);
    expect(updatedCountry).toBeDefined();
    expect(updatedCountry.name).toBe(updatedData.name);
  });

  it('should remove a country by ID', async () => {
    const createdCountry = await countryModel.create(CountryDTOStub());
    const removedCountry:any = await controller.remove(createdCountry._id);
    expect(removedCountry).toBeDefined();
    expect(removedCountry._id).toEqual(createdCountry._id);
    const countryInDatabase = await countryModel.findById(createdCountry._id);
    expect(countryInDatabase).toBeNull();
  });

});
