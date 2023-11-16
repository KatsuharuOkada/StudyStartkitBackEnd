import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import moment from 'moment';
import { ENV_CONFIGS } from '../../configs/constants/constants';
import { ExceptionInvalid, ExceptionNotFound } from '../../vendors/exceptions/errors.exception';
import { ERRORS } from '../../configs/constants/errors';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../../entities/users.entity';
import { AuthDto, TokenAuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<UsersEntity> {
    const user = await this.userService.findByEmail(email, { cities: { regions: true } });
    if (!user) {
      throw new ExceptionNotFound(ERRORS.USER_NOT_FOUND);
    }

    const passwordMatched = bcrypt.compareSync(password, user.password); // true
    if (!passwordMatched) {
      throw new ExceptionInvalid(ERRORS.WRONG_PASSWORD);
    }
    // User is not active account
    // if (!user.isVerified) {
    //   throw new ExceptionInvalid(ERRORS.USER_NOT_ACTIVE);
    // }
    // // User is suspended (not payment for service)
    // // TODO: Change when apply for family user (need to check appStatus of owner account)
    // if (!user.appStatus) {
    //   throw new ExceptionInvalid(ERRORS.USER_SUSPENDED);
    // }
    return user;
  }

  createAuthToken(payload: TokenAuthDto): AuthDto {
    const { accessToken, expired } = this.generateAccessToken(payload);
    const { refreshToken } = this.generateRefreshToken(payload);

    return { accessToken, refreshToken, expired, tokenType: 'Bearer' };
  }

  generateRefreshToken(payload: any) {
    const expired: string = moment().second(ENV_CONFIGS.APP.JWT_REFRESH_TOKEN_EXPIRE_TIME).toISOString();
    const refreshToken = this.jwtService.sign(payload, {
      secret: ENV_CONFIGS.APP.JWT_REFRESH_KEY,
      expiresIn: ENV_CONFIGS.APP.JWT_REFRESH_TOKEN_EXPIRE_TIME,
    });
    return { refreshToken, expired };
  }

  generateAccessToken(payload: any) {
    const expired: string = moment().second(ENV_CONFIGS.APP.JWT_ACCESS_TOKEN_EXPIRE_TIME).toISOString();
    const accessToken = this.jwtService.sign(payload, {
      secret: ENV_CONFIGS.APP.JWT_ACCESS_KEY,
      expiresIn: ENV_CONFIGS.APP.JWT_ACCESS_TOKEN_EXPIRE_TIME,
    });
    return { accessToken, expired };
  }

  generateVerificationToken(payload: any) {
    const expired: string = moment().second(ENV_CONFIGS.APP.JWT_CODE_EXPIRE_TIME).toISOString();
    const verificationToken = this.jwtService.sign(payload, {
      secret: ENV_CONFIGS.APP.JWT_CODE_KEY,
      expiresIn: ENV_CONFIGS.APP.JWT_CODE_EXPIRE_TIME,
    });
    return { verificationToken, expired };
  }

  generateResetPasswordToken(payload: any) {
    const expired: string = moment().second(ENV_CONFIGS.APP.JWT_RESET_PWD_TOKEN_EXPIRE_TIME).toISOString();
    const resetPasswordToken = this.jwtService.sign(payload, {
      secret: ENV_CONFIGS.APP.JWT_RESET_PWD_KEY,
      expiresIn: ENV_CONFIGS.APP.JWT_RESET_PWD_TOKEN_EXPIRE_TIME,
    });
    return { resetPasswordToken, expired };
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey === ENV_CONFIGS.APP.API_KEY;
  }

  verifyToken(token: string, key: string) {
    try {
      return this.jwtService.verify(token, { secret: key });
    } catch (err) {
      return err;
    }
  }

  async register(data) {
    return await this.userService.createUser(data);
  }

  async login(data): Promise<any> {
    const { loginId, password, deviceToken, uuid = 'thisisuid' } = data;
    const user = await this.validateUser(loginId, password);
    const payload = { userId: user.id, email: user.email, uuid };
    const auth = this.createAuthToken(payload);
    return {
      auth,
      user: user,
    };
  }

  async logout(data: TokenAuthDto): Promise<boolean> {
    const { userId, uuid } = data;
    return true;
  }

  async refreshToken(data: TokenAuthDto): Promise<any> {
    const { userId, uuid, email } = data;

    // data exist iat and exp, create new TokenAuthDto without these keys to generate token
    const tokenData: TokenAuthDto = { userId, uuid, email };
    const auth = this.generateAccessToken(tokenData);

    return auth;
  }
}
