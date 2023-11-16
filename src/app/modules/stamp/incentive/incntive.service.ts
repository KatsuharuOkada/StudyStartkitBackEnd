import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { IncentiveEntity } from '../../../entities/incentives.entity';
import { IncentiveInput, MutationResponse } from '../../../graphql/stamp.schema';

@Injectable()
export class IncentiveService {
  async getIncentives(): Promise<IncentiveEntity[]> {
    try {
      return await getRepository(IncentiveEntity).createQueryBuilder('ict').getMany();
    } catch (error) {
      throw error;
    }
  }

  async addIncentive(incentive: IncentiveInput): Promise<MutationResponse | any> {
    let result: MutationResponse = {
      statusCode: 200,
      data: null,
      error: null,
    };

    try {
      let incentiveInsert = new IncentiveEntity();
      Object.assign(incentiveInsert, incentive);
      const inserted = await getRepository(IncentiveEntity).insert(incentiveInsert);
      if (inserted) {
        result.data = `Insert incentive successful`;
      }
    } catch (error) {
      const err = {
        message: error.toString(),
        errorCode: '400',
        details: null,
      };
      result.statusCode = 400;
      result.error = err;
    }

    return result;
  }

  async updateIncentive(incentiveId: number, incentiveInput: IncentiveInput): Promise<MutationResponse> {
    let result: MutationResponse = {
      statusCode: 200,
      data: null,
      error: null,
    };

    try {
      let incentive = await this.getAnIncentive(incentiveId);

      if (incentive) {
        Object.assign(incentive, incentiveInput);
        const updated = await getRepository(IncentiveEntity).update({ id: incentiveId }, incentive);
        if (updated.raw.affectedRows > 0) {
          result.data = 'Update incentive successful.';
        } else {
          throw new Error('Update incentive fail.');
        }
      } else {
        throw new Error('Incentive does not exist.');
      }
    } catch (error) {
      const err = {
        message: error.toString(),
        errorCode: '400',
        details: null,
      };
      result.statusCode = 400;
      result.error = err;
    }

    return result;
  }

  async getAnIncentive(incentiveId: number): Promise<IncentiveEntity> {
    try {
      return await getRepository(IncentiveEntity)
        .createQueryBuilder('ict')
        .where('id = :incentiveId', { incentiveId })
        .getOne();
    } catch (error) {
      return null;
    }
  }
}
