import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UsersEntity } from './users.entity';

@Entity('device_tokens')
export class DeviceTokensEntity extends AbstractEntity {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'deviceToken' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'deviceToken', length: 255 }) })
  @Column({ name: 'deviceToken', type: 'varchar', length: 255, nullable: true })
  deviceToken: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'uuid' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'uuid', length: 255 }) })
  @Column({ name: 'uuid', type: 'varchar', length: 255, nullable: false, unique: true })
  uuid: string;

  @ManyToOne(() => UsersEntity, (user) => user.deviceTokens, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UsersEntity;
}
