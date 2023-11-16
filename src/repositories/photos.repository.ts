import { Repository, DataSource } from 'typeorm';
import { PhotosEntity } from '../entities/photos.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotosRepository extends Repository<PhotosEntity> {
  constructor(private dataSource: DataSource) {
    super(PhotosEntity, dataSource.createEntityManager());
  }
}
