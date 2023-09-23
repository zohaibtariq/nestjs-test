import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmRatingDto } from "./create-film-rating.dto";

export class UpdateFilmRatingDto extends PartialType(CreateFilmRatingDto) {}
