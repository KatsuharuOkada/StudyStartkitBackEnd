import { GraphQLClient } from 'graphql-request';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
// tslint:disable-next-line
require('dotenv').config();

/**
 * case 1: description here
 * case 2: description here
 */

jest.setTimeout(50000);
describe('getUserInformation', () => {
  let app: INestApplication;
  let fixture: TestingModule;

  const host = 'http://localhost:3000/api';
  const strQuery = `query ($userId: Int ){
    getUserInformation(userId :$userId ){
      statusCode
      message
    	data{
        userId
        userName
        email
        gender
    }
  }
}`;

  const expectedFail = {
    statusCode: 500,
    message: 'Some messages',
    data: null
  };

  const expectedSuccess = {
    statusCode: 200,
    message: 'Some messages',
    data: null
  };

  beforeAll(async done => {
    fixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = fixture.createNestApplication();
    await app.init();
    done();
  });

  it(`case 1: description here`, async () => {
    let headers = {
      authorization: process.env.APP_KEY
    };
    const variables = {};
    const client = new GraphQLClient(host, { headers });
    const response = await client.request(strQuery, variables);
    expect(response.getUserInformation).toMatchObject(expectedFail);
  });

  it(`case 2: description here`, async () => {
    let headers = {
      authorization: process.env.APP_KEY
    };
    const variables = {};
    const client = new GraphQLClient(host, { headers });
    const response = await client.request(strQuery, variables);
    expect(response.getUserInformation).toMatchObject(expectedSuccess);
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});
