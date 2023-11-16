/**
 * IDEA
 *
 * I will combine all file graphql in directory src. Then, I will use
 * library `https://github.com/timqian/gql-generator`
 * to gen all queries from file graphql have just merged.
 *
 * when run `yarn run merge-graphq`. All files have genenerated in ./__tests__/gqlGenerated
 * You can copy those files without waste your time to prepare query in website playground.
 * Basicly, I pretty hate prepare query.
 *
 */
import * as cp from 'child_process';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { print } from 'graphql';
import { writeFileSync } from 'fs';

const loadFiles = loadFilesSync(`${__dirname}/../../src/**/*.graphql`);
const typeDefs = mergeTypeDefs(loadFiles, {
  useSchemaDefinition: true,
  forceSchemaDefinition: true,
  throwOnConflict: true,
});
const printedTypeDefs = print(typeDefs);
writeFileSync(`${__dirname}/joined.graphql`, printedTypeDefs);

cp.execSync(
  'gqlg --schemaFilePath __tests__/utils/joined.graphql --destDirPath ./__tests__/gqlGenerated'
);
