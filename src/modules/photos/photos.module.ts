import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersService } from '../users/users.service';
import { PhotosEntity } from '../../entities/photos.entity';
import { PhotosRepository } from '../../repositories/photos.repository';
import { PhotosResolver } from './photos.resolver';
import { PhotosService } from './photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotosEntity])],
  providers: [PhotosRepository, PhotosService, PhotosResolver, UsersService, UsersRepository],
  exports: [PhotosService],
})
export class PhotosModule {}
