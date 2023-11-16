import { Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import * as GraphQLJSON from 'graphql-type-json';
import * as path from 'path';
import { GqlModuleOptions } from '@nestjs/graphql';

const graphQLConfig: GqlModuleOptions = {
  typePaths: [path.join(__dirname, '/../../', './**/*.graphql')],
  path: '/graphql',
  debug: true,

  playground: {
    endpoint: '/graphql'
  },
  include: [],
  context: ({ req }) => ({ req }),
  installSubscriptionHandlers: true,
  resolvers: { JSON: GraphQLJSON },
  formatError: (error: GraphQLError): any => {
    new Logger('GraphQLError').error(error);
    return error.message;
  },
  validationRules: []
};

export default graphQLConfig;
