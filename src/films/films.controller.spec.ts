import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Film, FilmSchema } from "./schemas/film.schema";
import { FilmDTOStub } from "./dto/film.dto.stub";
import { FilmsRepository } from "./films.repository";

describe("FilmsController", () => {

    let controller: FilmsController;
    let mongoConnection: Connection;

    let filmModel: Model<Film>;

    beforeAll(async () => {
        mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
        filmModel = mongoConnection.model(Film.name, FilmSchema);
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FilmsController],
            providers: [
                FilmsService,
                FilmsRepository,
                {provide: getModelToken(Film.name), useValue: filmModel},
            ],
        }).compile();
        controller = module.get<FilmsController>(FilmsController);
    });

    afterEach(async () => {
        const collections = mongoConnection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });

    it('FilmsController should be defined', () => {
        expect(controller).toBeDefined();
    });

    it("should return the saved object", async () => {
        const createdFilm = await controller.create(FilmDTOStub());
        expect(createdFilm.name).toBe(FilmDTOStub().name);
        expect(createdFilm.description).toBe(FilmDTOStub().description);
        expect(createdFilm.ticketPrice).toBe(FilmDTOStub().ticketPrice);
    });

});