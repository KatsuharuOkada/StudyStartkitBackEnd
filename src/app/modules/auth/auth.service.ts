import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from '../../graphql/graphql.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw Error('Email not found');
    }
    const passwordMatched = bcrypt.compareSync(password, user.password); // true
    if (passwordMatched) {
      return { email: user.email, userId: user.userId };
    }
    throw Error('Wrong password');
  }
  async login(user: LoginInput) {
    const payload = { email: user.email, password: user.password };
    const userDb = await this.validateUser(user.email, user.password);
    return {
      access_token: this.jwtService.sign({
        email: userDb.email,
        userId: userDb.userId,
      }),
    };
  }
}
