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
  data{
    categoryName
    }
  error{
    errorCode
    details{
      key
      }
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
    const { getCategory } = await request(host, strQuery, variables);
    console.log(getCategory);
    expect(getCategory).toMatchObject({
      error: {
        errorCode: '404',
        details: []
      }
    });
  });
});
