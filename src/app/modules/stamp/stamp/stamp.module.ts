import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncentiveModule } from '../incentive/incentive.module';
import { StampRepository } from './stamp.repository';
import { StampsResolver } from './stamp.resolver';
import { StampsService } from './stamp.service';

@Module({
  imports: [TypeOrmModule.forFeature([StampRepository]), IncentiveModule],
  providers: [StampsResolver, StampsService],
})
export class StampModule {}
