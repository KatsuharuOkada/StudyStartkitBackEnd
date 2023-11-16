import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CitiesEntity } from '../entities/cities.entity';

@Injectable()
export class CitiesRepository extends Repository<CitiesEntity> {
  constructor(private dataSource: DataSource) {
    super(CitiesEntity, dataSource.createEntityManager());
  }
}
