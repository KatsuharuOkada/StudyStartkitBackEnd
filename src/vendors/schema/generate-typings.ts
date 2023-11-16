import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory
  .generate({
    typePaths: [join(process.cwd(), '/src/vendors/**/*.graphql'), join(process.cwd(), '/src/modules/**/*.graphql')],
    path: join(process.cwd(), '/src/graphql.schema.ts'),
    outputAs: 'class',
    watch: false,
  })
  .catch((err) => {
    throw err;
  });
