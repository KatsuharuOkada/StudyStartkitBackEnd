import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { DevicesEntity } from './devices.entity';
import { UsersEntity } from './users.entity';

@Entity('users_devices')
export class UsersDevicesEntity extends AbstractEntity {
  @ManyToOne(() => UsersEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  renter: UsersEntity;

  @ManyToOne(() => DevicesEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'device_id', referencedColumnName: 'id' })
  devices: DevicesEntity;

  @Column({ type: 'datetime', name: 'rent_date', nullable: false })
  rentDate: Date;

  @Column({ type: 'datetime', name: 'return_date', nullable: false })
  returnDate: Date;
}
