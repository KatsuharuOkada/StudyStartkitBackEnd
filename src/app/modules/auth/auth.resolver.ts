import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { BaseResolver } from '../../../common/base/base.resolver';
import { LocalAuthGuard } from '../../../common/guards/local-auth.guard';
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
    const loginResponse = await this.authService.login(loginInput);
    return loginResponse;
  }
}
