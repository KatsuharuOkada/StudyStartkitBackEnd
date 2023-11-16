import { Resolver, Query, Mutation, Args, ObjectType } from '@nestjs/graphql';
import { IncentiveService } from './incntive.service';
import { Incentive, IncentiveInput } from '../../../graphql/stamp.schema';
import { MutationResponse } from '../../../graphql/graphql.schema';

@Resolver()
export class IncentiveResolver {
  constructor(private readonly incentiveService: IncentiveService) {}

  @Query('getIncentives')
  async getIncentives(): Promise<Incentive[] | any> {
    return await this.incentiveService.getIncentives();
  }

  @Mutation('addIncentive')
  async addIncentive(@Args('incentiveInput') incentiveInput: IncentiveInput): Promise<MutationResponse> {
    return await this.incentiveService.addIncentive(incentiveInput);
  }

  @Mutation('updateIncentive')
  async updateIncentive(
    @Args('incentiveId') incentiveId: number,
    @Args('incentiveInput') incentiveInput: IncentiveInput
  ): Promise<MutationResponse> {
    return await this.incentiveService.updateIncentive(incentiveId, incentiveInput);
  }
}
