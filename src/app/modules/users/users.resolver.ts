import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserQueryResponse, UserInformation, MutationResponse, CreateUserInputDto } from './dto/user.dto';
import { BaseResolver } from '../../../vendors/controller/BaseResolver';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../../vendors/guards/auth.guard';

@Resolver()
export class UsersResolver extends BaseResolver {
  constructor(private usersService: UsersService) {
    super();
  }

  @Query('getUserInformation')
  async getUserInformation(@Context() req: any, @Args('userId') userId: number): Promise<UserQueryResponse> {
    const response = new UserQueryResponse();
    const userInfo = new UserInformation();
    response.statusCode = this.successCodes.OK;
    response.message = this.successMessages.SUCCESS;
    try {
      const user = await this.usersService.getUserInfoByUserId(userId);
      if (user !== undefined) {
        userInfo.userId = user.userId;
        userInfo.userName = user.userName;
        userInfo.email = user.email;
      }
      response.data = userInfo;
    } catch (ex) {
      response.statusCode = this.errorCodes.INTERNAL_SERVER_ERROR;
      response.message = this.errorMessages.INTERNAL_SERVER_ERROR;
    }
    return response;
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
    try {
      await this.usersService.createUser(createUserInput);
      return {
        message: 'success',
        statusCode: this.successCodes.OK
      };
    } catch (error) {
      return {
        message: this.errorMessages.INTERNAL_SERVER_ERROR,
        statusCode: this.errorCodes.INTERNAL_SERVER_ERROR
      };
    }
  }
}
