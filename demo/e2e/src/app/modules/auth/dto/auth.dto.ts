import { LoginInput } from '../../../graphql/graphql.schema';
export class LoginDto extends LoginInput {
  email: string;
  fullname: string;
}
