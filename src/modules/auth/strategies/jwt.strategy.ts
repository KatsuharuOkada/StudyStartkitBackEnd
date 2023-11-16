import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ENV_CONFIGS } from '../../../configs/constants/constants';
import { JwtService } from '@nestjs/jwt';
import _ from 'lodash';
import { UsersService } from '../../users/users.service';
import { TokenAuthDto } from '../dtos/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private jwtService: JwtService, private userServices: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV_CONFIGS.APP.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }
  async validate(request: any) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const tokenData = this.jwtService.decode(accessToken) as TokenAuthDto;
    if (_.isEmpty(tokenData)) {
      return false;
    }

    const { userId, uuid } = tokenData;
    const user = await this.userServices.findById(userId);
    if (!user) {
      return false;
    }

    return user;
  }
}
