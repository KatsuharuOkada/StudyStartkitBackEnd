import { Resolver, Query, Args } from '@nestjs/graphql';
import { BaseResolver } from '../../../vendors/base/base.resolver';
import { LoginResponse } from '../../graphql/graphql.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Resolver()
export class AuthResolver extends BaseResolver {
  constructor(private authService: AuthService) {
    super();
  }

  @Query('login')
  async login(@Args('input') loginInput: LoginDto): Promise<LoginResponse> {
    const { access_token } = await this.authService.login(loginInput);
    return this.response({ accessToken: access_token });
  }
}
