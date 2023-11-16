import { IsNotEmpty, MaxLength } from 'class-validator';
import { ROLES } from '../common/constants';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { i18nValidationMessage } from 'nestjs-i18n';

@Entity('roles')
export class RolesEntity extends AbstractEntity {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'name' }) })
  @Column({
    name: 'name',
    type: 'enum',
    enum: ROLES,
    nullable: false,
    unique: true,
  })
  name: ROLES;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'description', length: 255 }) })
  @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
  description: string;
}
