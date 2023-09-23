import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateFilmRatingDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    readonly rating: number;

    @IsNotEmpty()
    @IsString()
    readonly comment: string;

}
