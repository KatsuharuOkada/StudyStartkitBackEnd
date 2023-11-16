import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../users.resolver';
import { UsersService } from '../users.service';
import { User } from '../../../entities/user.entity';

describe('getUserInformation Resolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;
  const mockServiceFun = {
    profile: async (userId: number): Promise<Partial<User>> => {
      return userId === 1
        ? {
            email: 'test@gmail.com',
            fullname: 'full Name',
            gender: 'MALE',
            userId: 1
          }
        : null;
    }
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useFactory: jest.fn(() => ({
            createUser: async () => 1,
            getUserInfoByUserId: jest.fn(userId => mockServiceFun.profile(userId))
          }))
        },
        UsersResolver
      ]
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('getUserInformation.should.be.found', async () => {
    const result = await resolver.profile({ userId: 1 });
    expect(result).toMatchObject({
      data: {
        email: 'test@gmail.com',
        fullname: 'full Name',
        gender: 'MALE',
        userId: 1
      }
    });
  });
});
