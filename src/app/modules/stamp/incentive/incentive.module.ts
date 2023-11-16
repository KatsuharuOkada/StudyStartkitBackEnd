import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncentiveService } from './incntive.service';
import { IncentiveResolver } from './incentive.resolver';
import { IncentiveEntity } from '../../../entities/incentives.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncentiveEntity])],
  providers: [IncentiveService, IncentiveResolver],
  exports: [],
})
export class IncentiveModule {}
