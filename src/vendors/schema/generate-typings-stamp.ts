import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

// tslint:disable

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory
  .generate({
    typePaths: ['./src/app/modules/stamp/**/*.graphql'],
    path: join(process.cwd(), 'src/app/graphql/stamp.schema.ts'),
    watch: false,
  })
  .catch((err) => {
    throw err;
  });
