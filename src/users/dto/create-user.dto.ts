import {
    IsNotEmpty,
    IsString,
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

}