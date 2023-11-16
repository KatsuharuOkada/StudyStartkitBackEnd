import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ENV_CONFIGS } from '../../../configs/constants/constants';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { TokenAuthDto } from '../dtos/auth.dto';
import _ from 'lodash';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'app-jwt-refresh-token') {
  constructor(private readonly jwtService: JwtService, private readonly userServices: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.refreshToken;
        },
      ]),
      ignoreExpiration: false, // TODO: true if need token never expire
      secretOrKey: ENV_CONFIGS.APP.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(params: any) {
    const { refreshToken } = params;
    const tokenData = this.jwtService.decode(refreshToken) as TokenAuthDto;
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
