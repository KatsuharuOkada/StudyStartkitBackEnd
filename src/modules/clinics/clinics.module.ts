import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsEntity } from '../../entities/clinics.entity';
import { ClinicsRepository } from '../../repositories/clinics.repository';
import { ClinicsService } from './clinics.service';
import { ClinicsResolver } from './clinics.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicsEntity])],
  providers: [ClinicsRepository, ClinicsService, ClinicsResolver],
  exports: [ClinicsService],
})
export class ClinicsModule {}
