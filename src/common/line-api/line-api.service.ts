import { HttpService, Injectable } from '@nestjs/common';
import { Logger } from '../logger/logger';
import { LineUser } from './line-api.interface';

@Injectable()
export class LineApiService {
  constructor(private httpService: HttpService, private loggerService: Logger) {}

  /**
   * @description Get LINE user information by 'Bearer {accessToken}'
   * @author TrungNM
   * @date 2020-10-08
   * @param {string} authHeader
   * @returns {Promise<LineUser>}
   */
  async getUser(authHeader: string): Promise<LineUser> {
    try {
      const response = await this.httpService
        .get('https://api.line.me/v2/profile', { headers: { Authorization: authHeader } })
        .toPromise();

      if (response.status >= 400) {
        throw new Error(response.data.error_description);
      }

      return response.data;
    } catch (error) {
      this.loggerService.error(error.stack);
      throw error;
    }
  }
}
