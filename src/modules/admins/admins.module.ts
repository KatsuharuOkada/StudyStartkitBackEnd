import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminssResolver } from './admins.resolver';
import { AdminsEntity } from '../../entities/admins.entity';
import { AdminsRepository } from '../../repositories/admins.repository';
import { AdminsService } from './admins.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsEntity])],
  providers: [AdminsRepository, AdminsService, AdminssResolver],
  exports: [AdminsService],
})
export class AdminsModule {}
