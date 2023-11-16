import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { ErrorCode, ErrorMessage, SucceedCode, SuccessMessage } from '../../../../common/messages';
import { UserStampEntity } from '../../../entities/user_stamp.entity';
import { MutationResponse } from '../../../graphql/graphql.schema';
import { AddStampReason, UserSummary } from '../../../graphql/stamp.schema';
import { IncentiveService } from '../incentive/incentive.service';
import { StampRepository } from './stamp.repository';

@Injectable()
export class StampsService {
  constructor(private stampRepository: StampRepository, private incentiveService: IncentiveService) {}

  async getSummary(userId: string): Promise<UserSummary> {
    return {
      userStampCount: await this.getUserStampCount(userId),
      userIncentiveCount: await this.incentiveService.getUserIncentiveCount(userId),
    };
  }

  /**
   * @description Get number stamps of a user
   * @author TrungNM
   * @date 2020-10-08
   * @param {string} userId
   * @returns {Promise<number>}
   */
  async getUserStampCount(userId: string): Promise<number> {
    return this.stampRepository.getUserStampCount(userId);
  }

  /**
   * @description Exchange user's stamps by a given incentive
   * @author TrungNM
   * @date 2020-10-08
   * @param {number} incentiveId
   * @param {string} userId
   * @returns {Promise<number>}
   */
  async exchangeStamp(incentiveId: number, userId: string): Promise<number> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const incentive = await this.incentiveService.getIncentive(incentiveId);
      const stampCount = await this.stampRepository.decreaseUserStampCount(incentive.stampCount, userId);
      await this.incentiveService.createIncentive(incentive.id, userId);
      await queryRunner.commitTransaction();

      return stampCount;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description add stamp
   * @author LoiNH
   * @date 2020-10-09
   * @param {string} userId
   * @return {*}  {(Promise<MutationResponse>)}
   * @memberof StampsService
   */
  async addStamp(userId: string): Promise<MutationResponse> {
    const result: MutationResponse = {
      statusCode: SucceedCode.OK,
      data: null,
      error: null,
    };
    let userStamp = null;

    const isFirstScan = await this.checkFirstLoginLine(userId);
    if (isFirstScan) {
      const newStamp = new UserStampEntity();
      newStamp.count = 1;
      newStamp.reason = AddStampReason.INSTALL;
      newStamp.userId = userId;
      newStamp.createdAt = new Date();
      newStamp.updatedAt = new Date();
      const inserted = await this.stampRepository.addStamp(newStamp);
      result.data = inserted ? SuccessMessage.SUCCESS : ErrorMessage.STAMP_UPDATE_FAIL;
      result.statusCode = !inserted && ErrorCode.STAMP_FAIL;
    } else {
      userStamp = await this.stampRepository.getStampAddedToday(userId);
      if (userStamp && userStamp.reason !== AddStampReason.INSTALL) {
        result.data = ErrorMessage.STAMP_ADD_MORE_ERROR;
        result.statusCode = ErrorCode.STAMP_FAIL;
        return result;
      } else {
        userStamp = await this.stampRepository.getUserStamp(userId);
      }
      userStamp.count++;
      userStamp.reason = AddStampReason.SCAN;
      userStamp.updatedAt = new Date();
      const updated = await this.stampRepository.updateStamp(userId, userStamp);
      result.data = updated ? SuccessMessage.SUCCESS : ErrorMessage.STAMP_UPDATE_FAIL;
      result.statusCode = !updated && ErrorCode.STAMP_FAIL;
    }
    return result;
  }

  /**
   * @description Check first login line
   * @author LoiNH
   * @date 2020-10-10
   * @param {string} userId
   * @return {*}  {Promise<boolean>}
   * @memberof StampsService
   */
  async checkFirstLoginLine(userId: string): Promise<boolean> {
    return (await this.stampRepository.getUserStamp(userId)) ? false : true;
  }
}
