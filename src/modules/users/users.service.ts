import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersEntity } from '../../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../../repositories/users.repository';
import _ = require('lodash');

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

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async createUser(data) {
    try {
      const { email, gender, userName, password } = data;
      const user = new UsersEntity();
      user.email = email;
      user.gender = gender;
      user.userName = userName;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return user;
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
}
