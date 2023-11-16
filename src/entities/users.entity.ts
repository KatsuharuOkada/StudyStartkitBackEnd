import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { GENDER } from '../common/constants';
import { i18nValidationMessage } from 'nestjs-i18n';
import { DeviceTokensEntity } from './device-tokens.entity';
import { CitiesEntity } from './cities.entity';
import { UserFamiliesEntity } from './user-families.entity';
@Entity('users')
export class UsersEntity extends AbstractEntity {
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Email' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Email', length: 255 }) })
  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Exclude()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Password' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Password', length: 255 }) })
  @Column({ name: 'password', type: 'varchar', length: 255, nullable: true })
  password: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'FirstName', length: 255 }) })
  @Column({ name: 'firstName', type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'LastName', length: 255 }) })
  @Column({ name: 'lastName', type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'NickName', length: 255 }) })
  @Column({ name: 'nickName', type: 'varchar', length: 255, nullable: true })
  nickName: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Gender' }) })
  @Column({ name: 'gender', type: 'enum', enum: GENDER, nullable: false, default: GENDER.NA })
  gender: GENDER;

  @Column({ name: 'birthDate', type: 'date', nullable: true })
  birthDate: Date;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'PhoneNumber', length: 255 }) })
  @Column({ name: 'phoneNumber', type: 'varchar', length: 255, nullable: true })
  phoneNumber: string;

  @Column({ name: 'appStatus', type: 'boolean', default: 0 })
  appStatus: boolean;

  @Column({ name: 'paymentDate', type: 'date', nullable: true })
  paymentDate: Date;

  @Column({ name: 'isVerified', type: 'boolean', default: 0 })
  isVerified: boolean;

  @Column({ name: 'gatewayId', type: 'varchar', length: 255, nullable: true, unique: true })
  gatewayId: string;

  @Column({ name: 'isInvited', type: 'boolean', default: 0 })
  isInvited: boolean;

  @ManyToOne(() => CitiesEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'cityId', referencedColumnName: 'id' })
  cities: CitiesEntity;

  @OneToMany(() => DeviceTokensEntity, (deviceToken) => deviceToken.user)
  deviceTokens: DeviceTokensEntity[];

  @OneToMany(() => UserFamiliesEntity, (userFamily) => userFamily.user)
  userFamilies: UserFamiliesEntity[];
}
