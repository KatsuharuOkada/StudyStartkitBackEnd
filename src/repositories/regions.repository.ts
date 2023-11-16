import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RegionsEntity } from '../entities/regions.entity';

@Injectable()
export class RegionsRepository extends Repository<RegionsEntity> {
  constructor(private dataSource: DataSource) {
    super(RegionsEntity, dataSource.createEntityManager());
  }
}
