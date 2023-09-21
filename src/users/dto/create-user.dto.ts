import {
    IsNotEmpty,
    IsString,
    // IsNumber,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    readonly password: string;

    // @IsNumber()
    // @IsNotEmpty()
    // price: number;
}