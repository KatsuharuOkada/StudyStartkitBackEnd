import { Min, IsEmail, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
  gender: string;
  userName: string;
}
