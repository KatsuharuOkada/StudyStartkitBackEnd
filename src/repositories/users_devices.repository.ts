import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersDevicesEntity } from '../entities/users_devices.entity';

@Injectable()
export class UsersDevicesRepository extends Repository<UsersDevicesEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersDevicesEntity, dataSource.createEntityManager());
  }
}
