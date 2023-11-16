import { UsersEntity } from '../../src/entities/users.entity';
import { PhotosEntity } from '../../src/entities/photos.entity';
import { CommentsEntity } from '../../src/entities/comments.entity';
import { DataSource } from 'typeorm';

class TestData {
  async saveUserInfo(con: DataSource, data: object) {
    return await con.getRepository(UsersEntity).save(data);
  }

  async savePhotoInfo(con: DataSource, data: object) {
    return await con.getRepository(PhotosEntity).save(data);
  }

  async saveCommentInfo(con: DataSource, data: object) {
    return await con.getRepository(CommentsEntity).save(data);
  }

  async deleteUserInfo(con: DataSource, condition: object) {
    return await con.getRepository(UsersEntity).delete(condition);
  }

  async deletePhotoInfo(con: DataSource, condition: object) {
    return await con.getRepository(PhotosEntity).delete(condition);
  }

  async deleteCommentInfo(con: DataSource, condition: object) {
    return await con.getRepository(CommentsEntity).delete(condition);
  }

  async findOnePhoto(con: DataSource, condition: object) {
    return await con.getRepository(PhotosEntity).findOne(condition);
  }
}

export default new TestData();
