import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncentiveService } from '../incentive/incentive.service';
import { IncentiveRepository } from './incentive.repository';
import { IncentiveResolver } from './incentive.resolver';
import { UserIncentiveRepository } from './user-incentive.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IncentiveRepository, UserIncentiveRepository])],
  providers: [IncentiveService, IncentiveResolver],
  exports: [IncentiveService],
})
export class IncentiveModule {}
