import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { REDIS_KEYS } from '../../common/constants';
import { UserRedisActiveDto, UserRedisAuthDto } from './dtos/auth.dto';

const TOKEN_KEY = 'USER-TOKEN-';

export class AuthRedis {
  constructor(@Inject(CACHE_MANAGER) private redis: Cache) {}

  async setTokenByUser(userId: number, value: any): Promise<any> {
    try {
      return await this.redis.set(`${TOKEN_KEY}${userId}`, value, 999999);
    } catch (err) {
      return false;
    }
  }

  async getTokenByUser(userId: number): Promise<any> {
    try {
      return await this.redis.get(`${TOKEN_KEY}${userId}`);
    } catch (err) {
      return false;
    }
  }

  async delTokenByUser(userId: number): Promise<any> {
    try {
      return await this.redis.del(`${TOKEN_KEY}${userId}`);
    } catch (err) {
      return false;
    }
  }

  private async setKey(key: string, value: any): Promise<any> {
    try {
      return await this.redis.set(key, value);
    } catch {
      return false;
    }
  }

  private async getKey(key: string): Promise<any> {
    try {
      return await this.redis.get(key);
    } catch {
      return false;
    }
  }

  private async deleteKey(key: string): Promise<any> {
    try {
      return await this.redis.del(key);
    } catch {
      return false;
    }
  }

  async setUserAuth(userId: number, data: UserRedisAuthDto): Promise<any> {
    return await this.setKey(`${REDIS_KEYS.USER_AUTH}-${userId}`, data);
  }

  async getUserAuth(userId: number): Promise<UserRedisAuthDto> {
    return (await this.getKey(`${REDIS_KEYS.USER_AUTH}-${userId}`)) || {};
  }

  async deleteUserAuth(userId: number): Promise<any> {
    return await this.deleteKey(`${REDIS_KEYS.USER_AUTH}-${userId}`);
  }

  async setUserActiveAccount(email: string, data: UserRedisActiveDto): Promise<any> {
    return await this.setKey(`${REDIS_KEYS.USER_ACTIVE_ACCOUNT}-${email}`, data);
  }

  async getUserActiveAccount(email: string): Promise<UserRedisActiveDto> {
    return (
      (await this.getKey(`${REDIS_KEYS.USER_ACTIVE_ACCOUNT}-${email}`)) || {
        verificationCode: null,
        verificationToken: null,
        resetPasswordToken: null,
      }
    );
  }

  async deleteUserActiveAccount(email: string): Promise<any> {
    return await this.deleteKey(`${REDIS_KEYS.USER_ACTIVE_ACCOUNT}-${email}`);
  }

  async resetInstance(): Promise<any> {
    try {
      return await this.redis.reset();
    } catch (err) {
      return false;
    }
  }
}
