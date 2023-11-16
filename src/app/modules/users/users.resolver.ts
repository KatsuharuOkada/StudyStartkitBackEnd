import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { MutationResponse, CreateUserInputDto } from './dto/user.dto';
import { BaseResolver } from '../../../vendors/base/base.resolver';
import { GqlUser } from '../../../vendors/decorators/user.decorator';
import { JwtAuthGuard } from '../../../vendors/guards/auth.guard';
import { UserQueryResponse } from '../../graphql/graphql.schema';
import { UseGuards, NotFoundException } from '@nestjs/common';

@Resolver()
export class UsersResolver extends BaseResolver {
  constructor(private usersService: UsersService) {
    super();
  }

  /**
   * Create new user
   *
   * @author TuNQ
   * @param {*} req
   * @param {CreateUserInputDto} createUserInput
   * @returns {Promise<MutationResponse>}
   * @memberof UsersResolver
   */
  @Mutation('createUser')
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Context() req: any,
    @Args('createUserInput') createUserInput: CreateUserInputDto
  ): Promise<MutationResponse> {
    const result = await this.usersService.createUser(createUserInput);
    return this.response(result);
  }

  @UseGuards(JwtAuthGuard)
  @Query('getUserInformation')
  async getUserInformation(@Args('userId') userId: number): Promise<UserQueryResponse> {
    const user = await this.usersService.getUserInfoByUserId(userId);
    if (!user) {
      throw new NotFoundException('Error', 'Data not found.');
    }
    return this.response(user);
  }
}
