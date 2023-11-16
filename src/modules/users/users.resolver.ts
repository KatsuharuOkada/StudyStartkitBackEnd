import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { UsersEntity } from '../../entities/users.entity';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { PagerDto } from '../../vendors/dto/pager.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UsersResolver extends BaseResolver {
  constructor(private usersService: UsersService) {
    super();
  }

  @Query('user')
  async getUser(@GqlUser() user: UsersEntity) {
    const { id } = user;
    const data = await this.usersService.getUser(id);
    return this.response(data);
  }

  @Query('users')
  async getUsers(@GqlUser() user: UsersEntity, @Args('Pager') pager) {
    const data = await this.usersService.getUsers(pager);
    return this.response(data);
  }
}
