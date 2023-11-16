const FileUtil = require('./utils/file-util.ts');
const constantUtil = require('./common/constant');
const GenerateE2EUtil = require('./utils/generate-e2e-util.ts');

module.exports = async function generateE2EQueryOne(answers) {
  // E2E path
  const path = `${constantUtil.E2E_PATH}/${answers.folderName}`;
  // Create folder if no exists
  FileUtil.createFolder(path);
  // Check e2e file exist or not
  const e2eFile = `${path}/api-${answers.apiName}.e2e.ts`;
  if (FileUtil.existPath(e2eFile)) {
    console.warn('File has already existed. Skip to generate e2e for query one.');
  } else {
    const queryOneData = FileUtil.readFile('./tools/templates/e2e/query-one.template');
    const replacedData = GenerateE2EUtil.replaceContentForQueryOne(queryOneData.toString(), answers);

    // Write file
    await FileUtil.writeFile(e2eFile, replacedData);
  }
};
