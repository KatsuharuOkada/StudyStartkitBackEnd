import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { callGraphQL, initApp, expectError, callLoginUser } from '../../common/utils';
import { HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import TestData from './../../common/data';

describe('Test api add photo', () => {
  let app: any,
    con: DataSource,
    loginUserInfo = {
      auth: {
        accessToken: '',
      },
    };

  const userData = {
    id: 1,
    userName: 'unit_test',
    // Raw pwd 123456aA@
    password: '$2a$12$4cNkcbo7sTqW74I5KY/YVe36DjoMLH74oSxat6zyrF.VfUmqZNGwy',
    email: 'unit_test@gmail.com',
    gender: 'male',
  };

  const addPhotoMutation = `
    mutation addPhoto($params: CreatePhotoDto!) {
      addPhoto(params: $params) {
        data {
          id
          url
          comment
          owner {
            id
            userName
            email
            gender
          }
        }
      }
    }
  `;

  beforeAll(async () => {
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = await initApp(moduleFixture);
      con = app.get(DataSource);

      await TestData.saveUserInfo(con, userData);

      // Login user to get valid access token
      loginUserInfo = await callLoginUser(app);
    } catch (error) {
      console.error('Unit test add photo error', error);
      throw new Error(error);
    }
  });

  afterAll(async () => {
    try {
      await TestData.deleteUserInfo(con, { id: userData.id });
      // Close app
      await app.close();
    } catch (error) {
      console.error('Unit test add photo error', error);
      throw new Error(error);
    }
  });

  it('Test no authorization', async () => {
    const body = await callGraphQL(app, addPhotoMutation, HttpStatus.UNAUTHORIZED, {
      params: {
        url: 'unit_test_url',
        comment: 'unit_test_comment',
      },
    });
    expectError(body, ['Unauthorized']);
  });

  it('Test params empty', async () => {
    const body = await callGraphQL(app, addPhotoMutation, HttpStatus.BAD_REQUEST);
    // Check return value
    expectError(body, ['was not provided']);
  });

  it('Test url not string', async () => {
    const body = await callGraphQL(
      app,
      addPhotoMutation,
      HttpStatus.BAD_REQUEST,
      {
        params: {
          url: 1,
          comment: 'unit_test_comment',
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expectError(body, ['represent a non string value']);
  });

  it('Test comment not string', async () => {
    const body = await callGraphQL(
      app,
      addPhotoMutation,
      HttpStatus.BAD_REQUEST,
      {
        params: {
          url: 'unit_test_url',
          comment: 1,
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expectError(body, ['represent a non string value']);
  });

  it('Test add photo success', async () => {
    const params = {
      url: 'unit_test_url',
      comment: 'unit_test_comment',
    };
    const body = await callGraphQL(
      app,
      addPhotoMutation,
      HttpStatus.OK,
      {
        params: params,
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    const addedPhoto = body.data.addPhoto.data;
    await TestData.deletePhotoInfo(con, { url: params.url });
    expect(addedPhoto).toMatchObject({
      id: addedPhoto.id,
      url: params.url,
      comment: params.comment,
      owner: {
        id: userData.id,
        userName: userData.userName,
        email: userData.email,
        gender: userData.gender,
      },
    });
  });
});
