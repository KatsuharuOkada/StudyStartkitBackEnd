import { GraphQLClient } from 'graphql-request';
import { Headers } from 'graphql-request/dist/src/types';
import * as jwt from 'jsonwebtoken';
// tslint:disable-next-line
require('dotenv').config();

type RequestParams = {
  host: string;
  /**
   * Payload to make JWT fake.
   */
  payloadJwt?: PayloadJwt;
  headers?: Headers;
  query?: string;
  variables?: object;
};
export type PayloadJwt = {
  [key: string]: any;
};

export async function authRequest({ host, headers, query, variables, payloadJwt }: RequestParams) {
  let combineHeaders = {
    authorization: '',
    ...headers
  };
  if (payloadJwt) {
    combineHeaders.authorization = `Bearer ${genToken(payloadJwt)}`;
  }
  const client = new GraphQLClient(host, { headers: combineHeaders });
  return client.request(query, variables);
}

function genToken(payload: PayloadJwt) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    noTimestamp: true
  });
}
