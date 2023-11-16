import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { DoctorsRepository } from '../../repositories/doctors.repository';
import { DoctorsEntity } from '../../entities/doctors.entity';

@Injectable()
export class DoctorsService {
  private entityAlias: string;
  constructor(
    // without custome repository
    // @InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>
    private doctorRepository: DoctorsRepository
  ) {
    this.entityAlias = DoctorsEntity.name;
  }
}
