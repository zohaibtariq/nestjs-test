import { CreateFilmDto } from "./create-film.dto";

export const FilmDTOStub = (): CreateFilmDto => {
    return {
        "name": "movie name",
        "description": "movie full long description",
        "releaseDate": new Date(),
        "ticketPrice": 100,
        genre: [
            "Action", "Adventure", "Thriller"
        ]
    };
};