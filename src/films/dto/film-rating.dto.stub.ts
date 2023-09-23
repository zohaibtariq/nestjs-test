import { CreateFilmRatingDto } from "./create-film-rating.dto";

export const FilmRatingDTOStub = (): CreateFilmRatingDto => {
    return {
        "rating": 4,
        "comment": "Just an above average movie"
    }
};