import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PagerDto, PageDto } from '../../vendors/dto/pager.dto';
import { UsersRepository } from './users.repository';
import _ = require('lodash');

@Injectable()
export class UsersService {
  private entityAlias: string;
  constructor(
    // without custome repository
    // @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    private userRepository: UsersRepository
  ) {
    this.entityAlias = UserEntity.name;
  }

  async getUser(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    try {
      const { email, gender, userName, password } = data;
      const user = new UserEntity();
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

  async getUsers(
    pager: PagerDto,
    filterConditions: object = undefined,
    orderConditions: object = undefined
  ): Promise<PageDto<UserDto>> {
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
    return data.toPageDto(paging);
  }
}
