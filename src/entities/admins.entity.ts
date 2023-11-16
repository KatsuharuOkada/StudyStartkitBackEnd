import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { i18nValidationMessage } from 'nestjs-i18n';

@Entity('admins')
export class AdminsEntity extends AbstractEntity {
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Email' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Email', length: 255 }) })
  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Exclude()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Password' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Password', length: 255 }) })
  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'FullName', length: 255 }) })
  @Column({ name: 'fullName', type: 'varchar', length: 255, nullable: true })
  fullName: string;
}
