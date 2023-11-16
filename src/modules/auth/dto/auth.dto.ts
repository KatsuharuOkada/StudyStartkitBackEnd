import { UserDto } from '../../users/dto/user.dto';
export class AuthData {
  accessToken: string;
  refreshToken: string;
  expired: string;
  tokenType: string;
}
export class AuthDto {
  auth: AuthData;
  user: UserDto;
}
export class AuthResponse {
  statusCode: number;
  message: string;
  data?: AuthDto;
  error?: Error;
}

export class RegisterResponse {
  statusCode: number;
  message: string;
  data?: UserDto;
  error?: Error;
}
