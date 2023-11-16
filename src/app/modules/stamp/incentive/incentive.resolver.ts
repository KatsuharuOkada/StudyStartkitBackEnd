import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../vendors/base/base.resolver';
import {
  IncentivesQueryResponse,
  UserIncentiveMutationResponse,
  UserIncentiveResponse,
} from '../../../graphql/stamp.schema';
import { IncentiveService } from './incentive.service';

@Resolver()
export class IncentiveResolver extends BaseResolver {
  constructor(private readonly incentiveService: IncentiveService) {
    super();
  }

  /**
   * @description Get all active incentives
   * @author TrungNM
   * @date 2020-10-09
   * @returns {Promise<IncentivesQueryResponse>}
   */
  @Query()
  async getIncentives(): Promise<IncentivesQueryResponse> {
    return this.response(await this.incentiveService.getIncentives());
  }

  /**
   * @description get user incentives
   * @author LoiNH
   * @date 2020-10-08
   * @param {string} userId
   * @return {*}  {Promise<UserIncentiveResponse>}
   * @memberof IncentiveResolver
   */
  @Query('getUserIncentives')
  async getUserIncentives(@Args('userId') userId: string): Promise<UserIncentiveResponse> {
    return this.response(await this.incentiveService.getUserIncentives(userId));
  }

  /**
   * @description set use an incentive
   * @author LoiNH
   * @date 2020-10-08
   * @param {number} userIncentiveId
   * @return {*}  {Promise<UserIncentiveMutationResponse>}
   * @memberof IncentiveResolver
   */
  @Mutation('useIncentive')
  async useIncentive(@Args('userIncentiveId') userIncentiveId: number): Promise<UserIncentiveMutationResponse> {
    return this.response(await this.incentiveService.updateAnUserIncentive(userIncentiveId));
  }
}
