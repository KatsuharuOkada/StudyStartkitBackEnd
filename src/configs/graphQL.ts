import { Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import * as path from 'path';
import { GqlModuleOptions } from '@nestjs/graphql';

const graphQLConfig: GqlModuleOptions = {
  typePaths: [path.join(__dirname, '/../', './**/*.graphql')],
  path: '/graphql',
  debug: true,

  playground: {
    endpoint: '/graphql',
  },

  context: ({ req }) => ({ req }),
  installSubscriptionHandlers: true,
  formatError: (error: GraphQLError): any => {
    new Logger('GraphQLError').error(error);
    return error.message;
  },
};

export default graphQLConfig;
