import { BadRequestException, Injectable } from '@nestjs/common';
import { PhotosEntity } from '../../entities/photos.entity';
import { PhotosRepository } from '../../repositories/photos.repository';
import { UsersEntity } from '../../entities/users.entity';
import _ = require('lodash');
import { UsersService } from '../users/users.service';
import { ForbiddenError } from 'apollo-server-core';
import { CommentsEntity } from '../../entities/comments.entity';

@Injectable()
export class PhotosService {
  private entityAlias: string;
  private userAlias: string;
  private commentAlias: string;
  constructor(private photoRepository: PhotosRepository, private userService: UsersService) {
    this.entityAlias = PhotosEntity.name;
    this.userAlias = UsersEntity.name;
    this.commentAlias = CommentsEntity.name;
  }

  /**
   * @author: ThanhLD
   * Method: getPhoto
   * Get photo by id
   * @param id: number
   * @returns photo
   */
  async getPhoto(id: number) {
    const queryBuilder = this.photoRepository
      .createQueryBuilder(this.entityAlias)
      .innerJoinAndSelect(`${this.entityAlias}.owner`, this.userAlias)
      .leftJoinAndSelect(`${this.entityAlias}.comments`, this.commentAlias)
      .select([
        `${this.entityAlias}.id`,
        `${this.entityAlias}.url`,
        `${this.entityAlias}.comment`,
        `${this.userAlias}.id`,
        `${this.userAlias}.userName`,
        `${this.userAlias}.gender`,
        `${this.userAlias}.email`,
        `${this.commentAlias}.id`,
        `${this.commentAlias}.comment`,
      ])
      .where(`${this.entityAlias}.id = :id`, { id });
    const photo = await queryBuilder.getOne();
    if (_.isEmpty(photo)) {
      throw new BadRequestException('Photo not found.');
    }
    return photo;
  }

  /**
   * @author: ThanhLD
   * Method getPhotos
   * Get list photos
   * @param pager: {limit: number, offset?: number, page?: number, isTakeAll?: boolean}
   * @param filterConditions: JSON Object
   * @param orderConditions: JSON Object
   * @returns {data, paging}
   */
  async getPhotos(pager, filterConditions: object = undefined, orderConditions: object = undefined) {
    const queryBuilder = this.photoRepository
      .createQueryBuilder(this.entityAlias)
      .innerJoinAndSelect(`${this.entityAlias}.owner`, this.userAlias)
      .leftJoinAndSelect(`${this.entityAlias}.comments`, this.commentAlias)
      .select([
        `${this.entityAlias}.id`,
        `${this.entityAlias}.url`,
        `${this.entityAlias}.comment`,
        `${this.userAlias}.id`,
        `${this.userAlias}.userName`,
        `${this.userAlias}.gender`,
        `${this.userAlias}.email`,
        `${this.commentAlias}.id`,
        `${this.commentAlias}.comment`,
      ]);
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

  /**
   * @author: ThanhLD
   * Method addPhoto
   * Add new photo
   * @param owner: UsersEntity
   * @param params: {url: string, comment:string}
   * @returns new photo
   */
  async addPhoto(owner: UsersEntity, params) {
    try {
      const { url, comment } = params;
      const object = new PhotosEntity();
      object.url = url;
      object.comment = comment;
      object.owner = await this.userService.findById(owner.id);
      const photo = this.photoRepository.create(object);
      return await this.photoRepository.save(photo);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * @author: ThanhLD
   * Method updatePhoto
   * Update photo by id
   * @param id: number
   * @param params: {comment:string}
   * @param user: UsersEntity
   * @returns new photo
   */
  async updatePhoto(id: number, params, user: UsersEntity) {
    const photo = await this.photoRepository.findOne({
      where: { id },
    });
    if (_.isEmpty(photo)) {
      throw new BadRequestException('Photo not found.');
    }
    if (photo.owner.id !== user.id) {
      throw new ForbiddenError('You do not permission to update');
    }
    this.photoRepository.merge(photo, params);
    return await this.photoRepository.save(photo);
  }

  /**
   * @author: ThanhLD
   * Method deletePhoto
   * Delete photo by id
   * @param id: number
   * @param user: UsersEntity
   * @returns boolean
   */
  async deletePhoto(id: number, user: UsersEntity) {
    const data = { result: false };
    const photo = await this.photoRepository.findOne({
      where: { id },
    });
    if (_.isEmpty(photo)) {
      throw new BadRequestException('Photo not found.');
    }
    if (photo.owner.id !== user.id) {
      throw new ForbiddenError('You do not permission to delete');
    }
    const result = await this.photoRepository.delete({ id });
    if (result.affected && result.affected > 0) {
      data.result = true;
    } else {
      data.result = false;
    }

    return data;
  }
}
