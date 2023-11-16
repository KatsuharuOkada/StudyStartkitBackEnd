import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput, LoginResponse } from '../../graphql/graphql.schema';
import * as bcrypt from 'bcrypt';
import { GraphQLException } from '../../../common/exceptions/graphql.exception';
import { APP_ERROR_CODES } from '../../../common/constants/errorCode';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new GraphQLException(HttpStatus.NOT_FOUND, {
        errorCode: 'EMAIL_NOT_FOUND',
        errorMessage: 'Email not found',
      });
    }
    const passwordMatched = bcrypt.compareSync(password, user.password); // true
    if (!passwordMatched) {
      throw new GraphQLException(HttpStatus.NOT_FOUND, {
        errorCode: APP_ERROR_CODES.PASSWORD_NOT_MATCH,
        errorMessage: 'Password not match.',
      });
    }
    return user;
  }
  async login(input: LoginInput): Promise<LoginResponse> {
    const userDb = await this.validateUser(input.email, input.password);
    const token = this.jwtService.sign({
      email: userDb.email,
      id: userDb.userId,
    });
    return {
      accessToken: token,
      email: userDb.email,
      Id: userDb.userId,
    };
  }
}
