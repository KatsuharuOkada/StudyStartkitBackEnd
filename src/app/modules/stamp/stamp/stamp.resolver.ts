import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { MutationResponse } from '../../../graphql/graphql.schema';
import { LineUser } from '../../../../common/line-api/line-api.interface';
import { BaseResolver } from '../../../../vendors/base/base.resolver';
import { CurrentLineUser } from '../../../../vendors/decorators/user.decorator';
import { StampAuthGuard } from '../../../../vendors/guards/stamp-auth.guard';
import {
  ExchangeStampMutationResponse,
  FirstLoginLineResponse,
  SummaryQueryResponse,
  UserStampsQueryResponse,
} from '../../../graphql/stamp.schema';
import { StampsService } from './stamp.service';
import { ErrorMessage } from '../../../../common/messages';

@Resolver()
export class StampsResolver extends BaseResolver {
  constructor(private stampService: StampsService) {
    super();
  }

  /**
   * @description Get number stamps of a user
   * @author TrungNM
   * @date 2020-10-08
   * @param {LineUser} user
   * @returns {Promise<UserStampsQueryResponse>}
   */
  @Query()
  @UseGuards(StampAuthGuard)
  async getSummary(@CurrentLineUser() user: LineUser): Promise<SummaryQueryResponse> {
    return this.response(await this.stampService.getSummary(user.userId));
  }

  @Query()
  @UseGuards(StampAuthGuard)
  async getUserStamps(@CurrentLineUser() user: LineUser): Promise<UserStampsQueryResponse> {
    return this.response(await this.stampService.getUserStampCount(user.userId));
  }

  /**
   * @description Exchange user's stamps by a given incentive
   * @author TrungNM
   * @date 2020-10-08
   * @param {number} incentiveId
   * @param {LineUser} user
   * @returns {Promise<ExchangeStampMutationResponse>}
   */
  @Mutation()
  @UseGuards(StampAuthGuard)
  async exchangeStamp(
    @Args('incentiveId') incentiveId: number,
    @CurrentLineUser() user: LineUser
  ): Promise<ExchangeStampMutationResponse> {
    return this.response(await this.stampService.exchangeStamp(incentiveId, user.userId));
  }

  /**
   * @description add stamp
   * @author LoiNH
   * @date 2020-10-09
   * @param {string} qrCode
   * @param {string} userId
   * @return {*}  {Promise<MutationResponse>}
   * @memberof StampsResolver
   */
  @Mutation('addStamp')
  async addStamp(@Args('qrCode') qrCode: string, @Args('userId') userId: string): Promise<MutationResponse> {
    if (qrCode === process.env.QR_CODE_PATTERN) {
      return await this.stampService.addStamp(userId);
    } else {
      return {
        statusCode: 400,
        data: ErrorMessage.QR_CODE_INVALID,
      };
    }
  }

  /**
   * @description check is first login line
   * @author LoiNH
   * @date 2020-10-10
   * @param {string} userId
   * @return {*}  {Promise<FirstLoginLine>}
   * @memberof StampsResolver
   */
  @Query('isFirstLoginLine')
  async isFirstLoginLine(@Args('userId') userId: string): Promise<FirstLoginLineResponse> {
    return this.response(await this.stampService.checkFirstLoginLine(userId));
  }
}
