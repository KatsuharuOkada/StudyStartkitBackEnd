import { UsersEntity } from '../../src/entities/users.entity';
import { PhotosEntity } from '../../src/entities/photos.entity';
import { CommentsEntity } from '../../src/entities/comments.entity';
import { ProjectsEntity } from '../../src/entities/projects.entity';
import { ProjectsSkillsEntity } from '../../src/entities/projects-skills.entity';
import { SkillsEntity } from '../../src/entities/skills.entity';
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

  async saveProjectInfo(con: DataSource, data: object) {
    return await con.getRepository(ProjectsEntity).save(data);
  }

  async saveProjectSkillInfo(con: DataSource, data: object) {
    return await con.getRepository(ProjectsSkillsEntity).save(data);
  }

  async saveSkillInfo(con: DataSource, data: object) {
    return await con.getRepository(SkillsEntity).save(data);
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

  async deleteProjectInfo(con: DataSource, condition: object) {
    return await con.getRepository(ProjectsEntity).delete(condition);
  }

  async deleteProjectSkillInfo(con: DataSource, condition: object) {
    return await con.getRepository(ProjectsSkillsEntity).delete(condition);
  }

  async deleteSkillInfo(con: DataSource, condition: object) {
    return await con.getRepository(SkillsEntity).delete(condition);
  }

  async findOnePhoto(con: DataSource, condition: object) {
    return await con.getRepository(PhotosEntity).findOne(condition);
  }

  async findOneProject(con: DataSource, condition: object) {
    return await con.getRepository(ProjectsEntity).findOne(condition);
  }

  async findOneProjectSkill(con: DataSource, condition: object) {
    return await con.getRepository(ProjectsSkillsEntity).findOne(condition);
  }

  async findOneSkill(con: DataSource, condition: object) {
    return await con.getRepository(SkillsEntity).findOne(condition);
  }

  async findProjectSkill(con: DataSource, condition: object) {
    return await con.getRepository(ProjectsSkillsEntity).find(condition);
  }
}

export default new TestData();
