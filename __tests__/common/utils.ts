import { TestingModule } from '@nestjs/testing';
import { HttpExceptionFilter } from './../../src/vendors/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

/**
 * Call api graphql query or mutation
 * @param app
 * @param query Mutation or Query
 * @param statusCode
 * @param params
 * @param headers { 'authorization': 'bearer xxx' }
 * @returns
 */
export const callGraphQL = async (
  app: any,
  query: String,
  // TODO need to check http status code
  statusCode: Number,
  params = {},
  headers = {}
) => {
  const { body } = await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: query,
      variables: params,
    })
    .set(headers);
  // .expect(statusCode);

  return body;
};

/**
 * Init testing
 * @param moduleFixture
 * @return
 */
export async function initApp(moduleFixture: TestingModule) {
  let app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.init();
  return app;
}

/**
 * Check response error
 * @param errorResult
 * @param expectedMsg
 */
export function expectError(errorResult: any, expectedMsg: Array<String>) {
  errorResult.errors.forEach((message: string, index: number) => {
    // Check error msg
    expect(message).toContain(expectedMsg[index]);
  });
}

/**
 * Login user
 * @param app
 * @param loginId
 * @param password
 * @returns userInfo
 */
export async function callLoginUser(app: any, loginId: string = 'unit_test@gmail.com', password: string = '123456aA@') {
  const mutationLogin = `
    mutation login($params: LoginDto!) {
      login(params: $params) {
        data {
          auth {
            accessToken
          }
          user {
            userName
            email
            gender
          }
        }
      }
    }
  `;

  const res = await callGraphQL(app, mutationLogin, HttpStatus.OK, {
    params: {
      loginId: loginId,
      password: password,
    },
  });

  return res.data.login.data;
}
