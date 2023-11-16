import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { AuthService } from './auth.service';
import { AuthResponse, RegisterResponse } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Resolver()
export class AuthResolver extends BaseResolver {
  constructor(private authService: AuthService) {
    super();
  }

  @Mutation('login')
  async login(@Args('LoginDto') loginInput: LoginDto): Promise<AuthResponse> {
    const data = await this.authService.login(loginInput);
    return this.response(data);
  }

  @Mutation('register')
  async register(@Args('RegisterDto') createUserDto: CreateUserDto): Promise<RegisterResponse> {
    const data = await this.authService.register(createUserDto);
    return this.response(data);
  }

  @Mutation('refreshToken')
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    const data = await this.authService.refreshToken(refreshToken);
    return this.response(data);
  }
}
