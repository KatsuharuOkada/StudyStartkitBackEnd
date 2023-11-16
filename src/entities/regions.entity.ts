import { IsNotEmpty, MaxLength } from 'class-validator';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CitiesEntity } from './cities.entity';

@Entity('regions')
export class RegionsEntity extends AbstractEntity {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'PostCode' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'PostCode', length: 255 }) })
  @Column({ name: 'postCode', type: 'varchar', length: 255, nullable: false, unique: true })
  postCode: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'RegionName' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'name', length: 255 }) })
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => CitiesEntity, (city) => city.regions)
  cities: CitiesEntity[];
}
