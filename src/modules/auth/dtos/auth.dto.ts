import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UserDto } from '../../users/dtos/users.dto';
import { PASSWORD_MIN_LENGTH } from '../../../configs/constants/constants';

export class LoginDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'email' }) })
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL', { message: 'hello' }) })
  loginId: string;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: i18nValidationMessage('validation.MIN', { property: 'password length' }),
  })
  password: string;

  // @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'deviceToken' }) })
  // deviceToken: string;

  // @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'uuid' }) })
  // uuid: string;
}

export type LoginResponseDto = {
  auth?: AuthDto;
  user?: UserDto;
  pet?: any; // TODO: Change later
};

export type AuthDto = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expired: string;
};

export type ActiveAccountDto = {
  email: string;
};

export type VerificationCodeDto = {
  email: string;
  userId: number;
};

export type ActiveAccountResponse = {
  verificationToken: string;
};

export type UserRedisAuthDto = {
  [uuid: string]: {
    accessToken: string;
    refreshToken: string;
  };
};

export type UserRedisActiveDto = {
  verificationToken: string;
  resetPasswordToken: string;
  verificationCode: string;
};

export type TokenAuthDto = {
  userId: number;
  email: string;
  uuid: string;
};
