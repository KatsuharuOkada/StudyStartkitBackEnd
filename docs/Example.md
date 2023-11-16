# How to develop
**Let's started with a small API.**

Scenario: We need to code a module Category. This module is have 2 API:

1. query category
2. mutation createCategory

The main purpose of this page is a example. Through it, we hope it will make you understand more this structure. And how to write unit test, e2e test. 

# Table of contents:

  - [Coding and testing](#coding-and-testing)
  - [Writing a simple API](#writing-a-simple-api)
  - [Writing unit test]()
  - [Writing e2e test]()
  - [Runing](./docs/INSTALL.md)



### 1. Creating model
 - We use [TypeORM](https://typeorm.io/#/) to make an ORM in this source.

- To use it, create model of category `src/app/entities/category.entity.ts`

In this file. We will need to  declare all column in table `category`. 
```js
import { Exclude } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ name: 'category_id' })
  categoryId: number;

  @IsNotEmpty({ message: 'Nick name can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false, name: 'category_name' })
  categoryName: string;

  @Exclude()
  @IsNotEmpty({ message: 'Password can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;
}
```

### 2. Create module category


```bash
- src
  |__app
  |  |__entities
  |    |__category.entity.ts # Define structure of table category.
  |____modules
      |__categories
      |  |__dto
      |  |  |__categories.dto.ts
      |  |__categories.module.ts
      |  |__categories.service.ts
      |  |__category.repository.ts
      |  |__categories.graphql
      |__|__categories.resolver.ts

```

- Create modules `src/app/modules/category.module.ts`

```js
import { Module } from '@nestjs/common';

@Module({})
export class CategoriesModule {}
```

- Create repository Category  `src/app/modules/category.module.ts`

 Each entity has its own repository which handles all operations with its entity.

```js
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../vendors/base/base.repository';
import { Category } from '../../entities/category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends BaseRepository<Category> {}
```

- Create service Category `src/app/modules/categories/categories.service.ts`

```js
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private userRepository: CategoriesRepository
  ) {}
}

```

- Create file graphql `src/app/modules/categories/categories.graphql`

```graphql
type Query {
  getCategory(categoryId: Int!): CategoryResponse
}

type Category {
  categoryId: Int
  categoryName: String
}

type CategoryResponse {
  statusCode: Int
  message: String
  data: Category
}

type CategoryListResponse {
  statusCode: Int
  message: String
  data: [Category]
}
```

- **Run command to general file type for graphql**

```sh
$ yarn run genenate-typings
```
 MUST: You must run above command after edit any file `*.graphql`. 
 
- Create resolver for process Api  `src/app/modules/categories/categories.resolver.ts`

```ts
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BaseResolver } from '../../../vendors/base/base.resolver';
import { CategoriesService } from './categoies.service';
import { CategoryResponse, CategoryInput, MutationResponse } from '../../graphql/graphql.schema';
import { UseFilters, HttpException, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../vendors/filters/http-exception.filter';
import { JoiValidationPipe } from '../../../vendors/pipes/joiValidation.pipe';
import * as joi from '@hapi/joi';
@Resolver()
@UseFilters(new HttpExceptionFilter())
export class CategoriesResolver extends BaseResolver {
  constructor(private readonly categoryService: CategoriesService) {
    super();
  }
  @UsePipes(
    new JoiValidationPipe<CategoryInput>({
      categoryName: joi
        .string()
        .min(1)
        .max(255)
    })
  )
  @Mutation('createCategory')
  async createCategory(@Args('input') input: CategoryInput): Promise<MutationResponse> {
    try {
      await this.categoryService.create(input);
      return {
        statusCode: 200,
        message: 'Create category successful'
      };
    } catch (error) {
      throw error;
    }
  }
  @Query('getCategory')
  async get(@Args('categoryId') id: number): Promise<CategoryResponse> {
    try {
      const category = await this.categoryService.get(id);
      if (!category) {
        throw new HttpException(
          {
            errorCode: 'NOT_FOUND',
            message: 'not TuNQ nhé',
            details: []
          },
          HttpStatus.NOT_FOUND
        );
      }
      return this.response(category);
    } catch (error) {
      throw error;
    }
  }
}

```

### Writing unit test

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categoies.service';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoriesService,
          useValue: () => ({
            get: async () => 1
          })
        },
        CategoriesResolver
      ]
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
```

### Writing e2e test

```ts
import { Connection, createConnection, Repository } from 'typeorm';
import { Category } from '../../src/app/entities/category.entity';
import request from 'graphql-request';
require('dotenv').config();
const host = `http://localhost:${process.env.APP_PORT}/graphql`;
/**
 * Sample data
 */
const categorySample: Partial<Category> = {
  categoryId: 1,
  categoryName: 'NQT',
  description: 'desciption lorem'
};
/**
 * Query sample
 */
const strQuery = `query get($input: Int!){
  getCategory(categoryId: $input){
  statusCode,
  message
  data{
    categoryName
    }
  }
}`;

describe('getCategory', () => {
  let cnn: Connection;
  let repo: Repository<Category>;
  /**
   * For some cases, You need to prepare data in db before run your test case.
   * You can put seed data in function `beforeAll` or `beforeEach`
   *
   */
  beforeAll(async () => {
    cnn = await createConnection();
    await cnn.createQueryRunner().clearTable('categories');
    repo = cnn.getRepository(Category);
    await repo.insert(categorySample);
  });
  afterAll(async () => {
    await repo.clear();
    await cnn.close();
  });

  it(`Shoud.be.response.category`, async () => {
    let headers = {
      authorization: process.env.APP_KEY
    };
    const variables = {
      input: 1
    };
    const { getCategory } = await request(host, strQuery, variables);
    expect(getCategory.data).toMatchObject({
      categoryName: 'NQT'
    });
  });

  it(`Shoud.be.response.error`, async () => {
    let headers = {
      authorization: process.env.APP_KEY
    };
    const variables = {
      input: 2
    };
    const promise = request(host, strQuery, variables);
    await expect(promise).rejects.toMatchObject({
      response: {
        errors: [
          {
            errorCode: 'NOT_FOUND',
            details: []
          }
        ]
      }
    });
  });
});

```
