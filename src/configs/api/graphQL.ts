import { Logger } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import * as GraphQLJSON from 'graphql-type-json';

const graphQLConfig = {
    typePaths: ['./**/**/*.graphql', './*.graphql'],
    path: '/api',
    debug: true,
    playground: true,
    context: ({ req }) => ({ headers: req.headers }),
    installSubscriptionHandlers: true,
    resolvers: { JSON: GraphQLJSON },
    formatError: (error: GraphQLError): any => {
        new Logger('GraphQLError').error(error);
        return error.message;
    },
    validationRules: []
}

export default graphQLConfig