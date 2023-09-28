import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  refreshToken?: string;
}
