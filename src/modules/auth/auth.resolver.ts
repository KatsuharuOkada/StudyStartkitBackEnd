import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { LoginDto, TokenAuthDto } from './dtos/auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { JwtRefreshGuard } from '../../vendors/guards/jwt-refresh.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver extends BaseResolver {
  constructor(private authService: AuthService) {
    super();
  }

  @Mutation('login')
  async login(@Args('params') params: LoginDto): Promise<any> {
    const data = await this.authService.login(params);

    return this.response(data);
  }

  @Mutation('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@GqlUser() data: TokenAuthDto): Promise<any> {
    const result = await this.authService.logout(data);

    return this.response({ result });
  }

  @Mutation('register')
  async register(@Args('RegisterDto') createUserDto) {
    const data = await this.authService.register(createUserDto);
    console.log('data', data);
    return this.response(data);
  }

  @Mutation('refreshToken')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@GqlUser() tokenAuthDto: TokenAuthDto): Promise<any> {
    const data = await this.authService.refreshToken(tokenAuthDto);

    return this.response(data);
  }
}
