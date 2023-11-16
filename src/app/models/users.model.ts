import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { getRepository } from 'typeorm';
import { ModelBase } from '../../vendors/model/model.base';

@Injectable()
export class UsersModel extends ModelBase {
  constructor() {
    super();
  }

  async getUserInfoByUserId(userId: number): Promise<User | undefined> {
    return await getRepository(User).findOne(userId);
  }

  async setUserInfor(user: User): Promise<boolean> {
    try {
      await getRepository(User).save(user);
      return true;
    } catch (ex) {
      return false;
    }
  }

  async createUser(newUser: User): Promise<boolean> {
    try {
      await getRepository(User).save(newUser);
    } catch (ex) {
      return false;
    }
    return true;
  }

  async deleteUser(user: User): Promise<boolean> {
    try {
      await getRepository(User).delete(user);
    } catch (ex) {
      return false;
    }
    return true;
  }
}
