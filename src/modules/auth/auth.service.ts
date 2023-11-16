import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import * as moment from 'moment';
import { UserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async register(data: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(data);
  }

  async login(data: LoginDto): Promise<AuthDto> {
    const { email, password } = data;
    const user = await this.validateUser(email, password);
    const payload = { id: user.id, email: user.email };
    const auth = this.createAuthToken(payload);

    return { auth, user };
  }

  async refreshToken(refreshToken: string): Promise<AuthDto> {
    try {
      const data = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_KEY,
        ignoreExpiration: false,
      });

      const { email, id } = data;
      const user = await this.userService.getUser(id);
      const payload = { email, id };
      const { accessToken, expired } = this.generateAccessToken(payload);

      return { auth: { accessToken, expired, tokenType: 'Bearer', refreshToken }, user };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    const passwordMatched = bcrypt.compareSync(password, user.password); // true
    if (passwordMatched) {
      return user;
    }
    throw new UnauthorizedException('Wrong password');
  }

  createAuthToken(payload: any) {
    const { accessToken, expired } = this.generateAccessToken(payload);
    const { refreshToken } = this.generateRefreshToken(payload);

    return { accessToken, refreshToken, expired, tokenType: 'Bearer' };
  }

  generateRefreshToken(payload: any) {
    const expired: string = moment().second(parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME)).toISOString();
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME),
    });
    return { refreshToken, expired };
  }

  generateAccessToken(payload: any) {
    const expired: string = moment().second(parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME)).toISOString();
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME),
    });
    return { accessToken, expired };
  }
}
