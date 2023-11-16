import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { AdminsRepository } from '../../repositories/admins.repository';
import { AdminsEntity } from '../../entities/admins.entity';

@Injectable()
export class AdminsService {
  private entityAlias: string;
  constructor(
    // without custome repository
    // @InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>
    private adminRepository: AdminsRepository
  ) {
    this.entityAlias = AdminsEntity.name;
  }
}
