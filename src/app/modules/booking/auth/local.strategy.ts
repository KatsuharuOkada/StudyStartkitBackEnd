import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy, Type } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy<Type>(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      /**
       * I replace default field `username` to email.
       */
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('sdfsdsdf', 'sdsdf');
    }
    return user;
  }
}
