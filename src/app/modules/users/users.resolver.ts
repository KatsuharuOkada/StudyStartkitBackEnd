import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UsersModel } from '../../models/users.model';
import { UserQueryResponse, UserInformation } from '../../graphql/users/user.dto';
import { BaseResolver } from '../../../vendors/controller/BaseResolver';

@Resolver()
export class UsersResolver extends BaseResolver {
  userModel: UsersModel;
  constructor() {
    super();
    this.userModel = new UsersModel();
  }

  @Query('getUserInformation')
  async getUserInformation(@Context() req: any, @Args('userId') userId: number): Promise<UserQueryResponse> {
    const response = new UserQueryResponse();
    const userInfo = new UserInformation();
    response.statusCode = this.successCodes.OK;
    response.message = this.successMessages.SUCCESS;
    try {
      const user = await this.userModel.getUserInfoByUserId(userId);
      if (user !== undefined) {
        userInfo.userId = user.user_id;
        userInfo.userName = user.user_name;
        userInfo.email = user.email;
      }
      response.data = userInfo;
    } catch (ex) {
      response.statusCode = this.errorCodes.INTERNAL_SERVER_ERROR;
      response.message = this.errorMessages.INTERNAL_SERVER_ERROR;
    }
    return response;
  }
}
