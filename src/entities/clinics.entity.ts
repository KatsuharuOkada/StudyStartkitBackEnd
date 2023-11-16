import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CitiesEntity } from './cities.entity';
import { DoctorsEntity } from './doctors.entity';

@Entity('clinics')
export class ClinicsEntity extends AbstractEntity {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Password' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Password', length: 255 }) })
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY', { property: 'Email' }) })
  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'Email', length: 255 }) })
  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'FirstAddress', length: 255 }) })
  @Column({ name: 'firstAddress', type: 'varchar', length: 255, nullable: true })
  firstAddress: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'SecondAddress', length: 255 }) })
  @Column({ name: 'secondAddress', type: 'varchar', length: 255, nullable: true })
  secondAddress: string;

  @MaxLength(255, { message: i18nValidationMessage('validation.LENGTH', { property: 'PhoneNumber', length: 255 }) })
  @Column({ name: 'phoneNumber', type: 'varchar', length: 255, nullable: true })
  phoneNumber: string;

  @ManyToOne(() => CitiesEntity, (city) => city.clinics, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'cityId', referencedColumnName: 'id' })
  cities: CitiesEntity;

  @OneToMany(() => DoctorsEntity, (doctor) => doctor.clinics)
  doctors: DoctorsEntity;
}
