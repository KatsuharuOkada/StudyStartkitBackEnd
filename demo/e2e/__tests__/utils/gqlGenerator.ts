/**
 * IDEA
 *
 * I will combine all file graphql in directory src. Then, I will use
 * library `https://github.com/timqian/gql-generator`
 * to gen all queries from file graphql have just merged.
 *
 * when run `yarn run merge-graphql`. All files have generated in ./__tests__/gqlGenerated
 * You can copy those files without waste your time to prepare query in website playground.
 * Basically, I pretty hate prepare query.
 *
 */
import * as cp from 'child_process';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { writeFileSync } from 'fs';

const typeDefs = mergeTypes(fileLoader(`${__dirname}/../../src/**/*.graphql`), {
  all: true,
});
writeFileSync(`${__dirname}/joined.graphql`, typeDefs);

cp.execSync(
  'gqlg --schemaFilePath __tests__/utils/joined.graphql --destDirPath ./__tests__/gqlGenerated'
);
