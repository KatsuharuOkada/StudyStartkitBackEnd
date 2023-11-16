import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UsersEntity } from './users.entity';

@Entity('reset_password_histories')
export class ResetPasswordHistoriesEntity extends AbstractEntity {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'token' }) })
  @Column({ name: 'token', type: 'varchar', length: 255, nullable: false })
  token: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'expiresAt' }) })
  @Column({ type: 'datetime', name: 'expiresAt', nullable: false })
  expiresAt: Date;

  @ManyToOne(() => UsersEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UsersEntity;
}
