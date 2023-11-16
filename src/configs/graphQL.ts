import * as path from 'path';
import { GqlModuleOptions } from '@nestjs/graphql';
import { handleFormatError } from '../common/utils/handleFormatError';

const graphQLConfig: GqlModuleOptions = {
  typePaths: [path.join(__dirname, '/../', './**/*.graphql')],
  path: '/graphql',
  debug: true,

  playground: {
    endpoint: '/graphql',
  },

  context: ({ req }) => ({ req }),
  installSubscriptionHandlers: true,
  formatError: handleFormatError,
};

export default graphQLConfig;
