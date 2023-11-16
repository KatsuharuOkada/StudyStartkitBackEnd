import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';

export enum OS {
  NA = 'N/A',
  IOS = 'iOS',
  ANDROID = 'Android',
}

export enum STATUS {
  AVAILABLE = 'Available',
  LEASED = 'Leased',
  BROKEN = 'Broken',
}

@Entity('devices')
export class DevicesEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'device_name' })
  deviceName: string;

  @IsNotEmpty({ message: 'OS can not be null or empty' })
  @Column({ name: 'os', type: 'enum', enum: OS, nullable: false, default: OS.NA })
  os: OS;

  @IsNotEmpty({ message: 'uuid can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  uuid: string;

  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @IsNotEmpty({ message: 'os version can not be null or empty' })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  osVersion: string;

  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @IsNotEmpty({ message: 'manufacturer can not be null or empty' })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  manufacturer: string;

  @IsNotEmpty({ message: 'status can not be null or empty' })
  @Column({ name: 'status', type: 'enum', enum: STATUS, nullable: false, default: STATUS.AVAILABLE })
  status: STATUS;
}
