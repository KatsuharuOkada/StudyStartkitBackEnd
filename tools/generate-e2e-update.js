const FileUtil = require('./utils/file-util.ts');
const constantUtil = require('./common/constant');
const GenerateE2EUtil = require('./utils/generate-e2e-util.ts');

module.exports = async function generateE2EUpdate(answers) {
  // E2E path
  const path = `${constantUtil.E2E_PATH}/${answers.folderName}`;
  // Create folder if no exists
  FileUtil.createFolder(path);
  // Check e2e file exist or not
  const e2eFile = `${path}/api-${answers.apiName}.e2e.ts`;
  if (FileUtil.existPath(e2eFile)) {
    console.warn('File has already existed. Skip to generate e2e for updating.');
  } else {
    const updateData = FileUtil.readFile('./tools/templates/e2e/update.template');
    let {
      content: replacedData,
      paramValues,
      id,
    } = GenerateE2EUtil.replaceContentForUpdate(updateData.toString(), answers);

    // Append validation string if having
    if (answers.validateStringInfo) {
      // Read template validation
      const validationStrData = FileUtil.readFile('./tools/templates/e2e/validation/validation-string.template');

      replacedData = GenerateE2EUtil.replaceAppendContent(
        replacedData,
        GenerateE2EUtil.replaceContentForValidation(
          validationStrData.toString(),
          answers.validateStringInfo,
          paramValues,
          id
        )
      );
    }

    // Append validation int if having
    if (answers.validateIntInfo) {
      // Read template validation
      const validationIntData = FileUtil.readFile('./tools/templates/e2e/validation/validation-int.template');

      replacedData = GenerateE2EUtil.replaceAppendContent(
        replacedData,
        GenerateE2EUtil.replaceContentForValidation(
          validationIntData.toString(),
          answers.validateIntInfo,
          paramValues,
          id
        )
      );
    }

    // Write file
    await FileUtil.writeFile(e2eFile, replacedData);
  }
};
