import { Connection, createConnection } from 'typeorm';
import { Category } from '../../src/app/entities/category.entity';
import request from 'graphql-request';
require('dotenv').config();
const host = `http://localhost:${process.env.APP_PORT}/graphql`;
/**
 * Sample data
 */
const categorySample: Partial<Category> = {
  categoryName: 'NQT',
  description: 'desciption lorem'
};
/**
 * Query sample
 */
const strQuery = `mutation 
  createCategory($input: CategoryInput!){
    createCategory(input: $input){
    statusCode

  }
}`;

describe('getCategory', () => {
  let cnn: Connection;
  /**
   * For some cases, You need to prepare data in db before run your test case.
   * You can put seed data in function `beforeAll` or `beforeEach`
   *
   */
  beforeAll(async () => {
    cnn = await createConnection();
    await cnn.createQueryRunner().clearTable('categories');
  });
  afterAll(async () => {
    await cnn.createQueryRunner().clearTable('categories');
    await cnn.close();
  });

  it(`Create category should be success`, async () => {
    const variables = {
      input: categorySample
    };
    const { createCategory } = await request(host, strQuery, variables);
    expect(createCategory).toMatchObject({
      statusCode: 200
    });
  });
  /**
   *
   */
  it(`Empty field categoryName should be throw error.INPUT_VALID`, async () => {
    const variables = {
      input: {
        categoryName: '',
        description: 'Brands milk in VN'
      }
    };
    try {
      await request(host, strQuery, variables);
    } catch (error) {
      expect(error.response).toMatchObject({
        errors: [
          {
            errorCode: 'INPUT_INVALID',
            message: 'Data invalid'
          }
        ]
      });
    }
  });
});
