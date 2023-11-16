import { Repository, DataSource } from 'typeorm';
import { DeviceTokensEntity } from '../entities/device-tokens.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceTokensRepository extends Repository<DeviceTokensEntity> {
  constructor(private dataSource: DataSource) {
    super(DeviceTokensEntity, dataSource.createEntityManager());
  }
}
