import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { ClinicsRepository } from '../../repositories/clinics.repository';
import { ClinicsEntity } from '../../entities/clinics.entity';

@Injectable()
export class ClinicsService {
  private entityAlias: string;
  constructor(
    // without custome repository
    // @InjectRepository(AdminsEntity) private AdminRepository: Repository<AdminsEntity>
    private clinicsRepository: ClinicsRepository
  ) {
    this.entityAlias = ClinicsEntity.name;
  }
}
