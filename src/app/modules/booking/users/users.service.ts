import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { CreateUserInputDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository
  ) {}
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
  async getUserInfoByUserId(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOne(userId);
  }

  async setUserInfor(user: User): Promise<boolean> {
    try {
      await this.userRepository.save(user);
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
  async createUser({ email, fullname, gender, password }: CreateUserInputDto): Promise<boolean> {
    try {
      // TODO: Need to implement.
      const user = new User();
      user.email = email;
      user.gender = gender;
      user.fullname = fullname;
      const salt = await bcrypt.genSalt(10);
      console.log(user);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      const result = await this.userRepository.insert(user);
      console.log(result);
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  async deleteUser(user: User): Promise<boolean> {
    try {
      await this.userRepository.delete(user);
    } catch (ex) {
      return false;
    }
    return true;
  }
}
