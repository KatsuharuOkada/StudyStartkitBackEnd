import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsResolver } from './doctors.resolver';
import { DoctorsEntity } from '../../entities/doctors.entity';
import { DoctorsRepository } from '../../repositories/doctors.repository';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorsEntity])],
  providers: [DoctorsRepository, DoctorsService, DoctorsResolver],
  exports: [DoctorsService],
})
export class DoctorsModule {}
