import { Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import * as GraphQLJSON from 'graphql-type-json';
import { GqlModuleOptions } from '@nestjs/graphql';

const graphQLConfig: GqlModuleOptions = {
  typePaths: ['./**/**/*.graphql', './*.graphql'],
  path: '/graphql',
  debug: true,

  playground: {
    endpoint: '/graphql'
  },
  include: [],
  context: ({ req }) => {
    return {
      headers: req.headers
    };
  },
  installSubscriptionHandlers: true,
  resolvers: { JSON: GraphQLJSON },
  formatError: (error: GraphQLError): any => {
    new Logger('GraphQLError').error(error);
    return error.message;
  },
  validationRules: []
};

export default graphQLConfig;
