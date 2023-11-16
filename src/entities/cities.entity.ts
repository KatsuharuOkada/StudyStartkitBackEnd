import { IsNotEmpty, MaxLength } from 'class-validator';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { i18nValidationMessage } from 'nestjs-i18n';
import { RegionsEntity } from './regions.entity';
import { ClinicsEntity } from './clinics.entity';

@Entity('cities')
export class CitiesEntity extends AbstractEntity {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'PostCode' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'PostCode', length: 255 }) })
  @Column({ name: 'postCode', type: 'varchar', length: 255, nullable: false, unique: true })
  postCode: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'CityName' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'CityName', length: 255 }) })
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => RegionsEntity, (region) => region.cities, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'regionId', referencedColumnName: 'id' })
  regions: RegionsEntity;

  @OneToMany(() => ClinicsEntity, (clinic) => clinic.cities)
  clinics: ClinicsEntity[];
}
