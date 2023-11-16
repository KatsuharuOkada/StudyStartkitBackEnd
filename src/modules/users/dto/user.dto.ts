import { PageDto } from '../../../vendors/dto/pager.dto';
import { AbstractDto } from '../../../vendors/base/abstract.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserDtoOptions {}
export class UserDto extends AbstractDto {
  id: number;
  userName: string;
  email: string;
  gender: string;

  constructor(entityName: UserEntity) {
    super();
    this.id = entityName.id;
    this.userName = entityName.userName;
    this.email = entityName.email;
    this.gender = entityName.gender;
  }
}

export class UserResponse {
  statusCode: number;
  data?: UserDto;
  message: string;
  error?: Error;
}

export class UsersResponse {
  statusCode: number;
  data?: PageDto<UserDto>;
  message: string;
  error?: Error;
}
