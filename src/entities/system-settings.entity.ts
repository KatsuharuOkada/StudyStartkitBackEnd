import { IsNotEmpty, MaxLength } from 'class-validator';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { Column, Entity } from 'typeorm';
import { i18nValidationMessage } from 'nestjs-i18n';

@Entity('system_settings')
export class SystemSettingsEntity extends AbstractEntity {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Key' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Key', length: 255 }) })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  key: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Value', length: 255 }) })
  @Column({ type: 'varchar', length: 255, nullable: true })
  value: string;
}
