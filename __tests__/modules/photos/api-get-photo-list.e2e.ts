import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { callGraphQL, initApp, expectError, callLoginUser } from '../../common/utils';
import { HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import TestData from './../../common/data';

describe('Test api get photo list', () => {
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

  let photoDataList: any = [];

  const queryGetPhotoList = `
    query getPhotos($Pager: Pager!) {
      getPhotos(Pager: $Pager) {
        statusCode
          message
          error
          data {
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
      console.error('Unit test get photo list error', error);
      throw new Error(error);
    }
  });

  afterAll(async () => {
    try {
      await TestData.deleteUserInfo(con, { id: userData.id });
      // Close app
      await app.close();
    } catch (error) {
      console.error('Unit test get photo list error', error);
      throw new Error(error);
    }
  });

  it('Test no authorization', async () => {
    const body = await callGraphQL(app, queryGetPhotoList, HttpStatus.UNAUTHORIZED, {
      Pager: {
        limit: 1,
        page: 0,
      },
    });
    expectError(body, ['Unauthorized']);
  });
  it('Test invalid limit not number', async () => {
    const body = await callGraphQL(app, queryGetPhotoList, HttpStatus.BAD_REQUEST, {
      Pager: {
        limit: 'abc',
        page: 1,
      },
    });
    // Check return value
    expectError(body, ['cannot represent non-integer']);
  });
  it('Test invalid page not number', async () => {
    const body = await callGraphQL(app, queryGetPhotoList, HttpStatus.BAD_REQUEST, {
      Pager: {
        limit: 1,
        page: 'abc',
      },
    });
    // Check return value
    expectError(body, ['cannot represent non-integer']);
  });
  it('Test photo empty', async () => {
    const body = await callGraphQL(
      app,
      queryGetPhotoList,
      HttpStatus.OK,
      {
        Pager: {
          limit: 1,
          page: 1,
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    checkPhotoList(body, []);
  });
  it('Test photo page 1 with having record', async () => {
    // Prepare data
    photoDataList = [
      {
        id: 1,
        url: 'unit_test_url_1',
        comment: 'unit_test_comment_1',
        owner: userData,
      },
      {
        id: 2,
        url: 'unit_test_url_2',
        comment: 'unit_test_comment_2',
        owner: userData,
      },
    ];
    await TestData.savePhotoInfo(con, photoDataList);

    const body = await callGraphQL(
      app,
      queryGetPhotoList,
      HttpStatus.OK,
      {
        Pager: {
          limit: 1,
          page: 1,
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    let expectedPhoto = photoDataList[0];
    expectedPhoto.comments = [];
    checkPhotoList(body, [expectedPhoto]);
  });
  it('Test photo page 2 with having record', async () => {
    const body = await callGraphQL(
      app,
      queryGetPhotoList,
      HttpStatus.OK,
      {
        Pager: {
          limit: 1,
          page: 2,
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    let expectedPhoto = photoDataList[1];
    expectedPhoto.comments = [];
    checkPhotoList(body, [expectedPhoto]);
  });
  it('Test photo page 3 with empty record', async () => {
    const body = await callGraphQL(
      app,
      queryGetPhotoList,
      HttpStatus.OK,
      {
        Pager: {
          limit: 1,
          page: 3,
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Check return value
    checkPhotoList(body, []);
  });
  it('Test photo with having comments', async () => {
    // Prepare data
    // Add comment
    let commentData = [
      {
        id: 1,
        comment: 'unit_test_comment_1',
        owner: userData,
        photo: photoDataList[0],
      },
      {
        id: 2,
        comment: 'unit_test_comment_2',
        owner: userData,
        photo: photoDataList[1],
      },
      {
        id: 3,
        comment: 'unit_test_comment_3',
        owner: userData,
        photo: photoDataList[1],
      },
    ];
    await TestData.saveCommentInfo(con, commentData);

    const body = await callGraphQL(
      app,
      queryGetPhotoList,
      HttpStatus.OK,
      {
        Pager: {
          limit: 10,
          page: 1,
        },
      },
      {
        authorization: 'Bearer ' + loginUserInfo.auth.accessToken,
      }
    );
    // Delete comment
    await Promise.all([
      TestData.deleteCommentInfo(con, { id: commentData[0].id }),
      TestData.deleteCommentInfo(con, { id: commentData[1].id }),
      TestData.deleteCommentInfo(con, { id: commentData[2].id }),
    ]);
    // Delete photo
    await Promise.all([
      TestData.deletePhotoInfo(con, { id: photoDataList[0].id }),
      TestData.deletePhotoInfo(con, { id: photoDataList[1].id }),
    ]);
    // Check return value
    let expectedPhoto1 = photoDataList[0];
    expectedPhoto1.comments = [
      {
        id: commentData[0].id,
        comment: commentData[0].comment,
      },
    ];
    let expectedPhoto2 = photoDataList[1];
    expectedPhoto2.comments = [
      {
        id: commentData[1].id,
        comment: commentData[1].comment,
      },
      {
        id: commentData[2].id,
        comment: commentData[2].comment,
      },
    ];
    checkPhotoList(body, [expectedPhoto1, expectedPhoto2]);
  });
});

/**
 * Check list photo
 * @param result
 * @param actualPhotoList
 */
function checkPhotoList(body: any, actualPhotoList: any) {
  // Check holiday list
  const res = body.data.getPhotos.data,
    photoList = res.data;
  // Check length
  expect(photoList.length).toEqual(actualPhotoList.length);
  // Check data
  photoList.forEach((photo: any, idx: number) => {
    const actualPhoto = actualPhotoList[idx];
    expect(photo).toMatchObject({
      id: actualPhoto.id,
      url: actualPhoto.url,
      comment: actualPhoto.comment,
      owner: {
        id: actualPhoto.owner.id,
        userName: actualPhoto.owner.userName,
        email: actualPhoto.owner.email,
        gender: actualPhoto.owner.gender,
      },
      comments: actualPhoto.comments,
    });
  });
}
