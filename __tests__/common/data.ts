import { UsersEntity } from '../../src/entities/users.entity';
import { DataSource } from 'typeorm';

class TestData {
  async saveInfo(con: DataSource, entity: any, data: object) {
    return await con.getRepository(entity).save(data);
  }

  async deleteInfo(con: DataSource, entity: any, condition: object) {
    return await con.getRepository(entity).delete(condition);
  }

  async findOneInfo(con: DataSource, entity: any, condition: object) {
    return await con.getRepository(entity).findOne(condition);
  }

  async findInfo(con: DataSource, entity: any, condition: object) {
    return await con.getRepository(entity).find(condition);
  }

  async deleteAll(con: DataSource, entity: any) {
    return await con.getRepository(entity).createQueryBuilder().delete().execute();
  }

  async saveUserInfo(con: DataSource, data: object) {
    return await con.getRepository(UsersEntity).save(data);
  }

  async deleteUserInfo(con: DataSource, condition: object) {
    return await con.getRepository(UsersEntity).delete(condition);
  }
}

export default new TestData();
