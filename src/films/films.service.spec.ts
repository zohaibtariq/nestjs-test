import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { getModelToken } from "@nestjs/mongoose";
import { Film, FilmSchema } from "./schemas/film.schema";
import { connect, Connection, Model } from "mongoose";
import { FilmDTOStub } from "./dto/film.dto.stub";
import { FilmsRepository } from "./films.repository";

describe('FilmsService', () => {
    let service: FilmsService;
    let mongoConnection: Connection;
    let filmModel: Model<Film>;

    beforeEach(async () => {
        mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
        filmModel = mongoConnection.model(Film.name, FilmSchema);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FilmsService,
                FilmsRepository,
                {provide: getModelToken(Film.name), useValue: filmModel},
            ],
        }).compile();
        service = module.get<FilmsService>(FilmsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should return the saved object", async () => {
        const createdFilm = await service.create(FilmDTOStub());
        expect(createdFilm.name).toBe(FilmDTOStub().name);
        expect(createdFilm.description).toBe(FilmDTOStub().description);
        expect(createdFilm.ticketPrice).toBe(FilmDTOStub().ticketPrice);
    });

});
