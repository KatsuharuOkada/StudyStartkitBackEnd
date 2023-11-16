import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { UserResponse, UsersResponse } from './dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { UserEntity } from './entities/user.entity';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { PagerDto } from '../../vendors/dto/pager.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UsersResolver extends BaseResolver {
  constructor(private usersService: UsersService) {
    super();
  }

  @Query('user')
  async getUser(@GqlUser() user: UserEntity): Promise<UserResponse> {
    const { id } = user;
    const data = await this.usersService.getUser(id);
    return this.response(data);
  }

  @Query('users')
  async getUsers(@GqlUser() user: UserEntity, @Args('Pager') pager: PagerDto): Promise<UsersResponse> {
    const data = await this.usersService.getUsers(pager);
    return this.response(data);
  }
}
