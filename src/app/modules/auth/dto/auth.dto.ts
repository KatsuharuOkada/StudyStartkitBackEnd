import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { LoginInput } from '../../../graphql/graphql.schema';
export class LoginDto extends LoginInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
