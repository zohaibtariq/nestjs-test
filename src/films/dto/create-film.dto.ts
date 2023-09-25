import { IsString, IsNotEmpty, IsNumber, IsDateString, IsUrl, ArrayMinSize, Min, Max } from 'class-validator';

export class CreateFilmDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsNotEmpty()
    @IsNumber()
    readonly ticketPrice: number;

    @IsNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    genre: string[];

}
