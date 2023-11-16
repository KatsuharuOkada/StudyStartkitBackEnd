import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { callGraphQL, initApp, expectError, callLoginUser } from '../../common/utils';
import { HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import TestData from './../../common/data';

describe('Test api update photo', () => {
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

  const updatePhotoMutation = `
    mutation updatePhoto($id: Int!, $params: UpdatePhotoDto!) {
      updatePhoto(id: $id, params: $params) {
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
      console.error('Unit test update photo error', error);
      throw new Error(error);
    }
  });

  afterAll(async () => {
    try {
      await TestData.deleteUserInfo(con, { id: userData.id });
      // Close app
      await app.close();
    } catch (error) {
      console.error('Unit test update photo error', error);
      throw new Error(error);
    }
  });

  it('Test no authorization', async () => {
    const body = await callGraphQL(app, updatePhotoMutation, HttpStatus.UNAUTHORIZED, {
      id: 1,
      params: {
        comment: 'update_unit_test_comment',
      },
    });
    expectError(body, ['Unauthorized']);
  });

  it('Test params empty', async () => {
    const body = await callGraphQL(app, updatePhotoMutation, HttpStatus.BAD_REQUEST);
    // Check return value
    expectError(body, ['was not provided', 'was not provided']);
  });

  it('Test invalid id not number', async () => {
    const body = await callGraphQL(
      app,
      updatePhotoMutation,
      HttpStatus.BAD_REQUEST,
      {
        id: 'abc',
        params: {
          comment: 'unit_test_comment',
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expectError(body, ['cannot represent non-integer']);
  });
  it('Test comment not string', async () => {
    const body = await callGraphQL(
      app,
      updatePhotoMutation,
      HttpStatus.BAD_REQUEST,
      {
        id: 1,
        params: {
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

  it('Test photo not found', async () => {
    const body = await callGraphQL(
      app,
      updatePhotoMutation,
      HttpStatus.BAD_REQUEST,
      {
        id: 1,
        params: {
          comment: 'unit_test_comment',
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expectError(body, ['Photo not found']);
  });

  it('Test photo not owner', async () => {
    // Prepare data
    // Other user
    let otherUser = Object.assign({}, userData);
    otherUser.id = 2;
    otherUser.email = 'unit_test_other@gmail.com';
    await TestData.saveUserInfo(con, otherUser);
    // Photo info
    const photoData = {
      id: 1,
      url: 'unit_test_url',
      comment: 'unit_test_comment',
      owner: otherUser,
    };
    await TestData.savePhotoInfo(con, photoData);

    const body = await callGraphQL(
      app,
      updatePhotoMutation,
      HttpStatus.FORBIDDEN,
      {
        id: photoData.id,
        params: {
          comment: 'unit_test_comment',
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Delete photo
    await TestData.deletePhotoInfo(con, { id: photoData.id });
    await TestData.deleteUserInfo(con, { id: otherUser.id });
    // Check return value
    expectError(body, ['You do not permission to update']);
  });

  it('Test update photo success', async () => {
    // Prepare data
    const photoData = {
      id: 1,
      url: 'unit_test_url',
      comment: 'unit_test_comment',
      owner: userData,
    };
    await TestData.savePhotoInfo(con, photoData);

    const params = {
      comment: 'update_unit_test_comment',
    };
    const body = await callGraphQL(
      app,
      updatePhotoMutation,
      HttpStatus.OK,
      {
        id: photoData.id,
        params: params,
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    await TestData.deletePhotoInfo(con, { id: photoData.id });
    expect(body.data.updatePhoto.data).toMatchObject({
      id: photoData.id,
      url: photoData.url,
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
