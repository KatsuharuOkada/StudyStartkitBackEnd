import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelBase } from '../../../vendors/model/model.base';
import { User } from '../../entities/user.entity';
import { CreateUserInputDto } from './dto/user.dto';

@Injectable()
export class UsersService extends ModelBase {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
    super();
  }

  async getUserInfoByUserId(userId: number): Promise<User | undefined> {
    return await this.usersRepository.findOne(userId);
  }

  async setUserInfor(user: User): Promise<boolean> {
    try {
      await this.usersRepository.save(user);
      return true;
    } catch (ex) {
      return false;
    }
  }

  /**
   *
   *
   * @author TuNQ
   * @param {CreateUserInputDto} { email, fullname, gender }
   * @returns {Promise<boolean>}
   * @memberof UsersService
   */
  async createUser({ email, fullname, gender }: CreateUserInputDto): Promise<boolean> {
    try {
      // TODO: Need to implement.
      const user = new User();
      user.email = email;
      user.userName = email;
      user.gender = gender;
      user.fullname = fullname;
      await this.usersRepository.save(user);
    } catch (ex) {
      return false;
    }
    return true;
  }

  async deleteUser(user: User): Promise<boolean> {
    try {
      await this.usersRepository.delete(user);
    } catch (ex) {
      return false;
    }
    return true;
  }
}
