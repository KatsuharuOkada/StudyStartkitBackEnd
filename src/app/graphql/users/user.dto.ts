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
