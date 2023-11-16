import { registerAs } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import * as GraphQLJSON from 'graphql-type-json';
import { join } from 'path';

export default registerAs('graphQL_booking', () => {
  const enablePlayground = process.env.GRAPHQL_PLAYGROUND_ENABLED === 'true';

  return {
    path: '/booking',
    typePaths: [join(__dirname, '/../../', './app/modules/booking/**/*.graphql')],
    debug: process.env.GRAPHQL_DEBUG === 'true',
    playground: enablePlayground,
    introspection: enablePlayground,
    context: ({ req, res }) => ({ req, res }),
    installSubscriptionHandlers: false,
    resolvers: {
      JSON: GraphQLJSON,
      Date: GraphQLDate,
      DateTime: GraphQLDateTime,
    },
  } as GqlModuleOptions;
});
