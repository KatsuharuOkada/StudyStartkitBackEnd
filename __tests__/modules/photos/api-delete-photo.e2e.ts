import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { callGraphQL, initApp, expectError, callLoginUser } from '../../common/utils';
import { HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import TestData from './../../common/data';

describe('Test api delete photo', () => {
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

  const deletePhotoMutation = `
    mutation deletePhoto($id: Int!) {
      deletePhoto(id: $id) {
        data {
          result
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
      console.error('Unit test delete photo error', error);
      throw new Error(error);
    }
  });

  afterAll(async () => {
    try {
      await TestData.deleteUserInfo(con, { id: userData.id });
      // Close app
      await app.close();
    } catch (error) {
      console.error('Unit test delete photo error', error);
      throw new Error(error);
    }
  });

  it('Test no authorization', async () => {
    const body = await callGraphQL(app, deletePhotoMutation, HttpStatus.UNAUTHORIZED, {
      id: 1,
    });
    expectError(body, ['Unauthorized']);
  });

  it('Test params empty', async () => {
    const body = await callGraphQL(app, deletePhotoMutation, HttpStatus.BAD_REQUEST);
    // Check return value
    expectError(body, ['was not provided']);
  });

  it('Test invalid id not number', async () => {
    const body = await callGraphQL(
      app,
      deletePhotoMutation,
      HttpStatus.BAD_REQUEST,
      {
        id: 'abc',
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expectError(body, ['cannot represent non-integer']);
  });

  it('Test photo not found', async () => {
    const body = await callGraphQL(
      app,
      deletePhotoMutation,
      HttpStatus.BAD_REQUEST,
      {
        id: 1,
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
      deletePhotoMutation,
      HttpStatus.FORBIDDEN,
      {
        id: photoData.id,
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Delete photo
    await TestData.deletePhotoInfo(con, { id: photoData.id });
    await TestData.deleteUserInfo(con, { id: otherUser.id });
    // Check return value
    expectError(body, ['You do not permission to delete']);
  });

  it('Test delete photo success', async () => {
    // Prepare data
    const photoData = {
      id: 1,
      url: 'unit_test_url',
      comment: 'unit_test_comment',
      owner: userData,
    };
    await TestData.savePhotoInfo(con, photoData);

    const body = await callGraphQL(
      app,
      deletePhotoMutation,
      HttpStatus.OK,
      {
        id: photoData.id,
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expect(body.data.deletePhoto.data.result).toEqual(true);
    const photoInfo = await TestData.findOnePhoto(con, { where: { id: photoData.id } });
    expect(photoInfo).toEqual(null);
  });
});
