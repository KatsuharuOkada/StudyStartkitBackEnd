import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesResolver } from '../categories.resolver';
import { CategoriesService } from '../categoies.service';
import * as _ from 'lodash';
import { HttpException } from '@nestjs/common';
describe('Categories resolver', () => {
  /**
   * Mock all data response.
   * Because controller `Categories` need to 1 service categories.
   * So we need to prepare all data response of service categories.
   */
  const mockDataResponse = {
    mockCreate: () => true,
    mockGet: (id: number) => {
      return _.find(
        [
          {
            categoryId: 1,
            categoryName: 'cateName',
            description: 'des'
          }
        ],
        { categoryId: id }
      );
    }
  };
  let resolver: CategoriesResolver;
  let service: CategoriesService;
  /**
   * We need to mock all services ared injected into controller.
   */
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      /**
       * Contructor function of controller categories need argument CategoriesService.
       * So we need to mock all function of service.
       */
      providers: [
        CategoriesResolver,
        {
          provide: CategoriesService,
          useFactory: jest.fn(() => ({
            create: jest.fn(() => mockDataResponse.mockCreate()),
            get: jest.fn((id) => mockDataResponse.mockGet(id))
          }))
        }
      ]
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Create new category should be success', async () => {
    const result = await resolver.createCategory({
      categoryName: 'CateName',
      description: '1'.repeat(20)
    });
    expect(result).toMatchObject({
      statusCode: 200
    });
    expect(service.create).toBeCalledTimes(1);
  });

  it('getCategory should be success', async () => {
    const result = await resolver.get(1);
    expect(result).toMatchObject({
      statusCode: 200,
      data: mockDataResponse.mockGet(1)
    });
    expect(service.get).toBeCalledTimes(1);
  });

  it('getCategory should be not found', async () => {
    await expect(resolver.get(2)).rejects.toThrow(HttpException);
    expect(service.get).toBeCalledTimes(2);
  });
});
