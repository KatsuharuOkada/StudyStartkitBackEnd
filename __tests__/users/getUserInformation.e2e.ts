import * as bcrypt from 'bcrypt';
import { createConnection, Connection } from 'typeorm';
import { User } from '../../src/app/entities/user.entity';
import { authRequest, PayloadJwt } from '../utils/authRequest';
// tslint:disable-next-line
require('dotenv').config();
const host = `http://localhost:${process.env.APP_PORT}/graphql`;
/**
 * Sample data
 */
const userSample = {
  userId: 1,
  fullname: 'NQT',
  accessToken: '',
  refreshToken: '',
  email: 'tunguyenq@gmail.com',
  gender: 'MALE',
  password: '1234567'
};

jest.setTimeout(50000);
describe('getUserInformation', () => {
  let cnn: Connection;
  const payloadJwt: PayloadJwt = {
    email: userSample.email,
    userId: userSample.userId
  };
  const strQuery = `query ($userId: Int ){
    getUserInformation(userId :$userId ){
      statusCode
      error{
        errorCode
        message
      }
    	data{
        userId
        userName
        email
        gender
    }
  }
}`;
  /**
   * For some cases, You need to prepare data in db before run your test case.
   * You can put seed data in function `beforeAll` or `beforeEach`
   *
   */
  beforeAll(async () => {
    cnn = await createConnection();

    await cnn.createQueryRunner().clearTable('users');
    const repo = cnn.getRepository(User);
    const userSampleDb = { ...userSample };
    /**
     * Hash password for user sample.
     */
    const passwordHash = await bcrypt.hash(userSample.password, 10);
    userSampleDb.password = passwordHash;
    const rs = await repo.insert(userSampleDb);
  });
  afterAll(async () => {
    await cnn.close();
  });

  it(`User should be found`, async () => {
    const variables = {
      userId: 1
    };
    const response = await authRequest({
      host,
      payloadJwt,
      query: strQuery,
      variables
    });

    expect(response.getUserInformation.data).toMatchObject({
      userId: userSample.userId,
      email: userSample.email,
      gender: userSample.gender
    });
  });

  it(`User should be NOT found`, async () => {
    const variables = {
      userId: 1234
    };

    const { getUserInformation } = await authRequest({
      host,
      payloadJwt,
      query: strQuery,
      variables
    });
    console.log(getUserInformation);
    expect(getUserInformation).toMatchObject({
      error: {
        errorCode: '404'
      }
    });
  });
});
