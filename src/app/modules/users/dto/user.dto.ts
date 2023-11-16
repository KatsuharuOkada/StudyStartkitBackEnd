import { Min, IsEmail, Length, MinLength } from 'class-validator';
import { CreateUserInput } from '../../../graphql/graphql.schema';

export class UserQueryResponse {
  statusCode: number;
  message: string;
  data: UserInformation;
}

export class UserInformation {
  userId: number;
  userName: string;
  email: string;
  gender: number;
}

export interface MutationResponse {
  statusCode: number;
  message: string;
}

/**
 * @description When you want to validate input of a API (Query or Mutation)
 * you only need to extend schema from graphql.schema.
 *
 * @author TuNQ
 * @export
 * @class CreateUserInputDto
 * @extends {CreateUserInput}
 */
export class CreateUserInputDto extends CreateUserInput {
  @IsEmail()
  email: string;
  @MinLength(6)
  fullname: string;
}
