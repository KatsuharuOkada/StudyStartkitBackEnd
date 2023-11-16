import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersEntity } from '../../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../../repositories/users.repository';
import _ from 'lodash';
import { Transactional } from 'typeorm-transactional';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class UsersService {
  private entityAlias: string;
  constructor(
    // without custome repository
    // @InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>
    private userRepository: UsersRepository
  ) {
    this.entityAlias = UsersEntity.name;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string, relations?: FindOptionsRelations<UsersEntity>) {
    return this.userRepository.findOne({
      where: { email },
      relations: relations,
    });
  }

  async findById(id: number, relations?: FindOptionsRelations<UsersEntity>) {
    return this.userRepository.findOne({
      where: { id },
      relations: relations,
    });
  }

  async createUser(data) {
    try {
      const { email, gender, userName, password } = data;
      const user = new UsersEntity();
      user.email = email;
      user.gender = gender;
      user.isVerified = true;
      user.appStatus = true;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return newUser;
    } catch (ex) {
      throw new BadRequestException(ex);
    }
  }

  async getUsers(pager, filterConditions: object = undefined, orderConditions: object = undefined) {
    const queryBuilder = this.userRepository.createQueryBuilder(this.entityAlias);
    if (!_.isEmpty(filterConditions)) {
      // add filters condition here
    }
    if (!_.isEmpty(orderConditions)) {
      // add orders condition here
    }
    // pass final queryBuilder here to paging
    const [data, paging] = await queryBuilder.paginate(pager, filterConditions, orderConditions);
    // parse result as paging result
    return { data, paging };
  }

  @Transactional()
  async updateUser(userId: number, data: Partial<UsersEntity>) {
    await this.userRepository.update({ id: userId }, data);
  }
}
