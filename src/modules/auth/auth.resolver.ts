import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver extends BaseResolver {
  constructor(private authService: AuthService) {
    super();
  }

  @Mutation('login')
  async login(@Args('params') params) {
    const data = await this.authService.login(params);
    return this.response(data);
  }

  @Mutation('register')
  async register(@Args('RegisterDto') createUserDto) {
    const data = await this.authService.register(createUserDto);
    return this.response(data);
  }

  @Mutation('refreshToken')
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    const data = await this.authService.refreshToken(refreshToken);
    return this.response(data);
  }
}
