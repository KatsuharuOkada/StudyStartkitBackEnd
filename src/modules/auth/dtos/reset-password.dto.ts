import { IsNotEmpty, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PASSWORD_MIN_LENGTH } from '../../../../configs/constants/constants';

export type ResetPasswordTokenDto = {
  userId: number;
  email: string;
};

export class ResetPasswordDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'resetPasswordToken' }) })
  resetPasswordToken: string;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: i18nValidationMessage('validation.MIN', { property: 'password length' }),
  })
  newPassword: string;
}
