const FileUtil = require('./utils/file-util.ts');
const GenerateUtil = require('./utils/generate-util.ts');
const constantUtil = require('./common/constant');

module.exports = async function generateUpdate(answers) {
  // Root path
  const path = `${constantUtil.ROOT_FOLDER}/${answers.folderName}`;
  // Create folder if no exists
  FileUtil.createFolder(path);
  // Graphql
  let graphqlTemplatePath = `${path}/${answers.folderName}.graphql`;
  if (!FileUtil.existPath(graphqlTemplatePath)) {
    graphqlTemplatePath = './tools/templates/graphql.template';
  }
  const graphqlData = FileUtil.readFile(graphqlTemplatePath),
    graphqlDataStr = graphqlData.toString();
  if (graphqlDataStr.indexOf(answers.apiName) > -1) {
    console.warn('This api has already existed. Skip to generate graphql.');
  } else {
    let replacedGraphqlData = GenerateUtil.replaceContentForGraphqlUpdate(graphqlDataStr, answers);

    // Write graphql file
    await FileUtil.writeFile(`${path}/${answers.folderName}.graphql`, replacedGraphqlData);
  }
  // Service
  let serviceTemplatePath = `${path}/${answers.folderName}.service.ts`;
  if (!FileUtil.existPath(serviceTemplatePath)) {
    serviceTemplatePath = './tools/templates/service.template';
  }
  const serviceData = FileUtil.readFile(serviceTemplatePath),
    serviceDataStr = serviceData.toString();
  if (serviceDataStr.indexOf(answers.apiName) > -1) {
    console.warn('This api has already existed. Skip to generate service.');
  } else {
    let replacedServiceData = GenerateUtil.replaceContentForService(serviceDataStr, answers);

    // Get update contents
    const updateSvData = FileUtil.readFile('./tools/templates/services/update.template');
    const replacedSvUpdateData = GenerateUtil.replaceContentForServiceUpdate(updateSvData.toString(), answers);

    replacedServiceData = replacedServiceData.replace(
      '// Append code in this place',
      '// Append code in this place\n' + replacedSvUpdateData + '\n'
    );

    // Write resolver file
    await FileUtil.writeFile(`${path}/${answers.folderName}.service.ts`, replacedServiceData);
  }
  // Resolver
  let resolverTemplatePath = `${path}/${answers.folderName}.resolver.ts`;
  if (!FileUtil.existPath(resolverTemplatePath)) {
    resolverTemplatePath = './tools/templates/resolver.template';
  }
  const resolverData = FileUtil.readFile(resolverTemplatePath),
    resolverDataStr = resolverData.toString();
  if (resolverDataStr.indexOf(answers.apiName) > -1) {
    console.warn('This api has already existed. Skip to generate resolver.');
  } else {
    let replacedResolverData = GenerateUtil.replaceContentForResolver(resolverDataStr, answers);
    // Get update contents
    const rsUpdateData = FileUtil.readFile('./tools/templates/resolvers/update.template');
    const replacedRsUpdateData = GenerateUtil.replaceContentForResolverUpdate(rsUpdateData.toString(), answers);

    replacedResolverData = replacedResolverData.replace(
      '// Append code in this place',
      '// Append code in this place\n' + replacedRsUpdateData + '\n'
    );
    // Write resolver file
    await FileUtil.writeFile(`${path}/${answers.folderName}.resolver.ts`, replacedResolverData);
  }
  // Module
  if (answers.isSkipOverrideModule !== 'yes') {
    const moduleData = FileUtil.readFile('./tools/templates/modules.template');
    const replacedModuleData = GenerateUtil.replaceContentForModule(moduleData.toString(), answers);

    await FileUtil.writeFile(`${path}/${answers.folderName}.module.ts`, replacedModuleData);

    // Append module if needed
    const appPath = './src/app.module.ts',
      appData = FileUtil.readFile(appPath),
      appDataStr = appData.toString();
    if (appDataStr.indexOf(`./modules/${answers.folderName}/${answers.folderName}.module`) > -1) {
      console.warn('This module has been already imported into app. Skip it.');
    } else {
      const replaceImportModule = GenerateUtil.replaceContentForImportedModule(appDataStr, answers);

      await FileUtil.writeFile(appPath, replaceImportModule);
    }
  } else {
    console.warn('Skip to generate module.');
  }
};
