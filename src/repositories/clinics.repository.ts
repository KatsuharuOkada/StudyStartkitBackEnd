import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ClinicsEntity } from '../entities/clinics.entity';

@Injectable()
export class ClinicsRepository extends Repository<ClinicsEntity> {
  constructor(private dataSource: DataSource) {
    super(ClinicsEntity, dataSource.createEntityManager());
  }
}
