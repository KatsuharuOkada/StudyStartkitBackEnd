import { Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import * as path from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

const graphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  typePaths: [
    path.join(__dirname, '/../', 'vendors/**/*.graphql'),
    path.join(__dirname, '/../', 'modules/**/*.graphql'),
  ],
  path: '/graphql',
  debug: true,
  playground: {
    endpoint: '/graphql',
  },
  context: ({ req, res }) => ({ req, res }),
  installSubscriptionHandlers: true,
  csrfPrevention: true,
  formatError: (error: GraphQLError): any => {
    if (process.env.NODE_ENV !== 'test') {
      new Logger('GraphQLError').error(error);
    }

    const res = error.extensions?.response;
    if (res && res['message']) {
      const msg = res['message'];
      return Array.isArray(msg) ? msg[0] : msg;
    }

    return error.message;
  },
};

export default graphQLConfig;
