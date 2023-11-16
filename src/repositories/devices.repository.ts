import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DevicesEntity } from '../entities/devices.entity';

@Injectable()
export class DevicesRepository extends Repository<DevicesEntity> {
  constructor(private dataSource: DataSource) {
    super(DevicesEntity, dataSource.createEntityManager());
  }
}
