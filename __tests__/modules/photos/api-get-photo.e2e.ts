import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { callGraphQL, initApp, expectError, callLoginUser } from '../../common/utils';
import { HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import TestData from './../../common/data';

describe('Test api get photo', () => {
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

  let photoData: any = {};

  const queryGetPhoto = `
    query getPhoto($id: Int!) {
      getPhoto(id: $id) {
        statusCode
          message
          error
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
            comments {
              id
              comment
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
      console.error('Unit test get photo error', error);
      throw new Error(error);
    }
  });

  afterAll(async () => {
    try {
      await TestData.deleteUserInfo(con, { id: userData.id });
      // Close app
      await app.close();
    } catch (error) {
      console.error('Unit test get photo error', error);
      throw new Error(error);
    }
  });

  it('Test no authorization', async () => {
    const body = await callGraphQL(app, queryGetPhoto, HttpStatus.UNAUTHORIZED, {
      id: 1,
    });
    expectError(body, ['Unauthorized']);
  });
  it('Test invalid id not number', async () => {
    const body = await callGraphQL(app, queryGetPhoto, HttpStatus.BAD_REQUEST, {
      id: 'abc',
    });
    // Check return value
    expectError(body, ['cannot represent non-integer']);
  });
  it('Test photo not found', async () => {
    const body = await callGraphQL(
      app,
      queryGetPhoto,
      HttpStatus.OK,
      {
        id: userData.id,
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expectError(body, ['Photo not found']);
  });
  it('Test photo with having photo and no comments', async () => {
    // Prepare data
    photoData = {
      id: 1,
      url: 'unit_test_url',
      comment: 'unit_test_comment',
      owner: userData,
    };
    await TestData.savePhotoInfo(con, photoData);

    const body = await callGraphQL(
      app,
      queryGetPhoto,
      HttpStatus.OK,
      {
        id: userData.id,
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    expect(body.data.getPhoto.data).toMatchObject({
      id: photoData.id,
      url: photoData.url,
      comment: photoData.comment,
      owner: {
        id: userData.id,
        userName: userData.userName,
        email: userData.email,
        gender: userData.gender,
      },
      comments: [],
    });
  });
  it('Test photo with having photo and comments', async () => {
    // Prepare data
    // Add comment
    const commentData = [
      {
        id: 1,
        comment: 'unit_test_comment_1',
        owner: userData,
        photo: photoData,
      },
      {
        id: 2,
        comment: 'unit_test_comment_2',
        owner: userData,
        photo: photoData,
      },
    ];
    await TestData.saveCommentInfo(con, commentData);

    const body = await callGraphQL(
      app,
      queryGetPhoto,
      HttpStatus.OK,
      {
        id: userData.id,
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Delete photo
    await Promise.all([
      TestData.deleteCommentInfo(con, { id: commentData[0].id }),
      TestData.deleteCommentInfo(con, { id: commentData[1].id }),
    ]);
    await TestData.deletePhotoInfo(con, { id: photoData.id });
    // Check return value
    expect(body.data.getPhoto.data).toMatchObject({
      id: photoData.id,
      url: photoData.url,
      comment: photoData.comment,
      owner: {
        id: userData.id,
        userName: userData.userName,
        email: userData.email,
        gender: userData.gender,
      },
      comments: [
        {
          id: commentData[0].id,
          comment: commentData[0].comment,
        },
        {
          id: commentData[1].id,
          comment: commentData[1].comment,
        },
      ],
    });
  });
});
