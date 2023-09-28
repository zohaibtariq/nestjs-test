import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateCountryDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly iso: string;

}