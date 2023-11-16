const _ = require('lodash');
const constantUtil = require('../common/constant');
const moment = require('moment');
const FORMAT_YYYYMMDDHHMMSS = 'YYYY-MM-DD HH:mm:ss';

class GenerateUtil {
  replaceContentForModule(content, params) {
    // Check import packages if having
    let otherPackages = '',
      otherPackageNames = '';
    if (params.importPackages) {
      const splitImportPackages = params.importPackages.split(',');
      splitImportPackages.forEach((importPackage) => {
        if (importPackage.indexOf(';') > -1) {
          const splitImportPackage = importPackage.split(';');
          if (splitImportPackage.length === 2) {
            const importPackageName = splitImportPackage[0].trim();
            otherPackages += `import { ${importPackageName} } from '${splitImportPackage[1].trim()}';\n`;

            otherPackageNames += importPackageName + ', ';
          } else {
            console.warn('Generate module - invalid input importPackages.');
          }
        }
      });
    }

    return content
      .replace(/{{upperFirstLetterName}}/g, _.upperFirst(params.folderName))
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{otherPackages}}/g, otherPackages)
      .replace(/{{otherPackageNames}}/g, otherPackageNames)
      .replace(/{{devName}}/g, params.devName);
  }

  replaceContentForResolver(content, params) {
    let authentication = '';
    if (params.isAuthentication === 'yes') {
      authentication = '@UseGuards(JwtAuthGuard)';
    }

    return content
      .replace(/{{authentication}}/g, authentication)
      .replace(/{{upperFirstLetterName}}/g, _.upperFirst(params.folderName))
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{devName}}/g, params.devName);
  }

  replaceContentForResolverQueryOne(content, params) {
    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{name}}/g, _.lowerCase(params.folderName))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS));
  }

  replaceContentForService(content, params) {
    let importService = '',
      initService = '';
    // Import & init service
    if (params.importPackages) {
      const splitImportPackages = params.importPackages.split(',');
      splitImportPackages.forEach((importPackage) => {
        if (importPackage.indexOf(';') > -1) {
          const splitImportPackage = importPackage.split(';');

          if (splitImportPackage.length === 2) {
            const importPackageName = splitImportPackage[0].trim();
            if (importPackageName.indexOf('Service') > -1 || importPackageName.indexOf('Repository') > -1) {
              importService += `import { ${importPackageName} } from '${splitImportPackage[1].trim()}';\n`;
              initService += `private ${_.camelCase(importPackageName)}: ${importPackageName},`;
            }
          } else {
            console.warn('Generate service - invalid input importPackages.');
          }
        }
      });
    }
    // Import entities and init alias
    let importEntity = '',
      otherEntityAlias = '',
      initOtherEntityAlias = '';
    if (params.importOtherAlias) {
      const splitImportAlias = params.importOtherAlias.split(',');
      splitImportAlias.forEach((importAlias) => {
        if (importAlias.indexOf(';') > -1) {
          const splitImportInfo = importAlias.split(';');
          if (splitImportInfo.length === 3) {
            const aliasName = splitImportInfo[0].trim(),
              importName = splitImportInfo[1].trim();
            importEntity += `import { ${importName} } from '${splitImportInfo[2].trim()}';\n`;
            otherEntityAlias += `private ${aliasName}: string;\n`;
            initOtherEntityAlias += `this.${aliasName} = ${importName}.name;\n`;
          } else {
            console.warn('Generate service - invalid input importOtherAlias.');
          }
        }
      });
    }

    return content
      .replace(/{{upperFirstLetterName}}/g, _.upperFirst(params.folderName))
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{importService}}/g, importService)
      .replace(/{{initService}}/g, initService)
      .replace(/{{importEntity}}/g, importEntity)
      .replace(/{{otherEntityAlias}}/g, otherEntityAlias)
      .replace(/{{initOtherEntityAlias}}/g, initOtherEntityAlias)
      .replace(/{{devName}}/g, params.devName);
  }

  replaceContentForServiceQueryOne(content, params) {
    const importJoin = this.getImportJoin(params),
      // Select column name
      importSelect = this.getImportSelect(params);

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{importJoin}}/g, importJoin)
      .replace(/{{importSelect}}/g, importSelect)
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('get', '')))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS));
  }

  /**
   * Get input or output param for graphql
   * @param content
   * @param params
   * @param key inputParam/outputParam
   */
  getParamForGraphql(content, params, key, msg) {
    const splitParam = params[key].split(',');
    let typeName = '',
      output = '',
      type = key === constantUtil.INPUT_PARAM_KEY ? constantUtil.GRAPHQL_INPUT : constantUtil.GRAPHQL_OUTPUT;

    splitParam.forEach((param) => {
      const splitInfo = param.split('->');
      if (splitInfo.length === 2) {
        const name = splitInfo[0].trim();
        // Use to assign to type of input param or type of output param
        if (!typeName) {
          typeName = name;
        }

        if (content.indexOf(name) <= -1) {
          const graphqlParams = splitInfo[1].trim().split(';');
          output += `${type} ${name} {\n`;
          graphqlParams.forEach((graphqlParam) => {
            output += `  ${graphqlParam.trim()}\n`;
          });
          output += '}\n';
        }
      } else {
        console.warn(`Replace content for graphql ${msg} - invalid input ${key}.`);
      }
    });

    return {
      typeName,
      output,
    };
  }

  replaceContentForGraphqlQueryOne(content, params) {
    const action = 'query one',
      convertedOutput = this.getParamForGraphql(content, params, constantUtil.OUTPUT_PARAM_KEY, action);

    // Query
    let query = '';
    if (convertedOutput.typeName) {
      if (content.indexOf('type Query {') > -1) {
        query =
          '  # Append query in this place\n' + '  ' + params.apiName + '(id: Int!): ' + convertedOutput.typeName + '\n';
      } else {
        query =
          'type Query {\n' +
          '  # Append query in this place\n' +
          '  ' +
          params.apiName +
          '(id: Int!): ' +
          convertedOutput.typeName +
          '\n}\n';
      }
    }

    return content
      .replace('# Append query in this place', query)
      .replace('# Append output in this place', '# Append output in this place\n' + convertedOutput.output)
      .replace(/{{devName}}/g, params.devName);
  }

  replaceContentForGraphqlUpdate(content, params) {
    // Get input & output param
    const action = 'update',
      convertedInput = this.getParamForGraphql(content, params, constantUtil.INPUT_PARAM_KEY, action),
      convertedOutput = this.getParamForGraphql(content, params, constantUtil.OUTPUT_PARAM_KEY, action);
    // Mutation
    let mutation = '';
    if (convertedOutput.typeName) {
      if (content.indexOf('type Mutation {') > -1) {
        mutation =
          '  # Append mutation in this place\n' +
          '  ' +
          params.apiName +
          '(id: Int!, params: ' +
          convertedInput.typeName +
          '): ' +
          convertedOutput.typeName +
          '\n';
      } else {
        mutation =
          'type Mutation {\n' +
          '  # Append mutation in this place\n' +
          '  ' +
          params.apiName +
          '(id: Int!, params: ' +
          convertedInput.typeName +
          '): ' +
          convertedOutput.typeName +
          '\n}\n';
      }
    }

    content = content
      .replace(/{{devName}}/g, params.devName)
      .replace('# Append mutation in this place', mutation)
      .replace('# Append input in this place', '# Append input in this place\n' + convertedInput.output);
    if (convertedOutput.output) {
      content = content.replace(
        '# Append output in this place',
        '# Append output in this place\n' + convertedOutput.output
      );
    }

    return content;
  }

  replaceContentForResolverUpdate(content, params) {
    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{name}}/g, _.lowerCase(params.folderName))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS));
  }

  replaceContentForServiceUpdate(content, params) {
    const otherSaveInfo = this.getOtherSaveInfo(params, false, true);

    let deleteOtherTableInfo = '';
    if (params.otherTableDeleteInfo) {
      const splitOtherDeleteInfo = params.otherTableDeleteInfo.split(',');
      splitOtherDeleteInfo.forEach((deleteInfo) => {
        const splitInfo = deleteInfo.split('->');
        if (splitInfo.length === 2) {
          let info = 'await this.' + splitInfo[0].trim() + '.delete(';
          info += splitInfo[1] + ');';

          deleteOtherTableInfo += info + '\n';
        } else {
          console.warn('Invalid input deleteOtherTableInfo.');
        }
      });
    }

    let transaction = '';
    if (otherSaveInfo || deleteOtherTableInfo) {
      transaction = '@Transactional()';
    }

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('update', '')))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS))
      .replace(/{{transaction}}/g, transaction)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherTableDeleteInfo}}/g, deleteOtherTableInfo);
  }

  replaceContentForGraphqlDelete(content, params) {
    // Mutation
    let mutation = '';
    if (content.indexOf('type Mutation {') > -1) {
      mutation = '  # Append mutation in this place\n' + '  ' + params.apiName + '(id: Int!): DeleteResponse\n';
    } else {
      mutation =
        'type Mutation {\n' +
        '  # Append mutation in this place\n' +
        '  ' +
        params.apiName +
        '(id: Int!): DeleteResponse' +
        '\n}\n';
    }

    return content.replace(/{{devName}}/g, params.devName).replace('# Append mutation in this place', mutation);
  }

  replaceContentForResolverDelete(content, params) {
    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{name}}/g, _.lowerCase(params.folderName))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS));
  }

  replaceContentForServiceDelete(content, params) {
    let deleteOtherTableInfo = '';
    if (params.otherTableDeleteInfo) {
      const splitOtherDeleteInfo = params.otherTableDeleteInfo.split(',');
      splitOtherDeleteInfo.forEach((deleteInfo) => {
        const splitInfo = deleteInfo.split('-');
        if (splitInfo.length === 2) {
          let info = 'await this.' + splitInfo[0].trim() + '.delete(';
          info += splitInfo[1] + ');';

          deleteOtherTableInfo += info + '\n';
        } else {
          console.warn('Invalid input deleteOtherTableInfo.');
        }
      });
    }

    let transaction = '';
    if (deleteOtherTableInfo) {
      transaction = '@Transactional()';
    }

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('delete', '')))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS))
      .replace(/{{transaction}}/g, transaction)
      .replace(/{{deleteOtherTableInfo}}/g, deleteOtherTableInfo);
  }

  replaceContentForGraphqlAdd(content, params) {
    // Get input & output param
    const action = 'update',
      convertedInput = this.getParamForGraphql(content, params, constantUtil.INPUT_PARAM_KEY, action),
      convertedOutput = this.getParamForGraphql(content, params, constantUtil.OUTPUT_PARAM_KEY, action);
    // Mutation
    let mutation = '';
    if (convertedOutput.typeName) {
      if (content.indexOf('type Mutation {') > -1) {
        mutation =
          '  # Append mutation in this place\n' +
          '  ' +
          params.apiName +
          '(params: ' +
          convertedInput.typeName +
          '): ' +
          convertedOutput.typeName +
          '\n';
      } else {
        mutation =
          'type Mutation {\n' +
          '  # Append mutation in this place\n' +
          '  ' +
          params.apiName +
          '(params: ' +
          convertedInput.typeName +
          '): ' +
          convertedOutput.typeName +
          '\n}\n';
      }
    }

    content = content
      .replace(/{{devName}}/g, params.devName)
      .replace('# Append mutation in this place', mutation)
      .replace('# Append input in this place', '# Append input in this place\n' + convertedInput.output);
    if (convertedOutput.output) {
      content = content.replace(
        '# Append output in this place',
        '# Append output in this place\n' + convertedOutput.output
      );
    }

    return content;
  }

  replaceContentForResolverAdd(content, params) {
    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{name}}/g, _.lowerCase(params.folderName))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS));
  }

  replaceContentForServiceAdd(content, params) {
    let lowerFolderName = _.lowerCase(params.folderName),
      objEntity = lowerFolderName + 'ObjEntity',
      objUpdateEntity = '';
    if (params.othersUpdateEntity) {
      const splitUpdateEntity = params.othersUpdateEntity.split(',');
      splitUpdateEntity.forEach((updateEntity) => {
        const splitUpdateContent = updateEntity.split(':');
        objUpdateEntity += objEntity + '.' + splitUpdateContent[0].trim() + ' = ' + splitUpdateContent[1] + ';\n';
      });
    }

    const otherSaveInfo = this.getOtherSaveInfo(params);

    let transaction = '';
    if (otherSaveInfo) {
      transaction = '@Transactional()';
    }

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{upperFirstLetterName}}/g, _.upperFirst(params.folderName))
      .replace(/{{lowerCaseName}}/g, lowerFolderName)
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('add', '')))
      .replace(/{{objEntity}}/g, objEntity)
      .replace(/{{othersUpdateEntity}}/g, objUpdateEntity)
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS))
      .replace(/{{transaction}}/g, transaction)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo);
  }

  replaceContentForGraphqlQueryList(content, params) {
    const action = 'query list',
      convertedOutput = this.getParamForGraphql(content, params, constantUtil.OUTPUT_PARAM_KEY, action);

    // Query
    let query = '';
    if (convertedOutput.typeName) {
      if (content.indexOf('type Query {') > -1) {
        query +=
          '  # Append query in this place\n' +
          '  ' +
          params.apiName +
          '(Pager: Pager!, FilterConditions: JSON, OrderConditions: JSON): ' +
          convertedOutput.typeName +
          '\n';
      } else {
        query =
          'type Query {\n' +
          '  # Append query in this place\n' +
          '  ' +
          params.apiName +
          '(Pager: Pager!, FilterConditions: JSON, OrderConditions: JSON): ' +
          convertedOutput.typeName +
          '\n}\n';
      }
    }

    return content
      .replace('# Append query in this place', query)
      .replace('# Append output in this place', '# Append output in this place\n' + convertedOutput.output)
      .replace(/{{devName}}/g, params.devName);
  }

  replaceContentForResolverQueryList(content, params) {
    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{name}}/g, _.lowerCase(params.folderName))
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS));
  }

  replaceContentForServiceQueryList(content, params) {
    const importJoin = this.getImportJoin(params),
      // Select column name
      importSelect = this.getImportSelect(params);

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{importJoin}}/g, importJoin)
      .replace(/{{importSelect}}/g, importSelect + ';')
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{generatedDate}}/g, moment().format(FORMAT_YYYYMMDDHHMMSS));
  }

  replaceContentForImportedModule(content, params) {
    const moduleName = _.upperFirst(params.folderName) + 'Module',
      path = `./modules/${params.folderName}/${params.folderName}.module`,
      importContent = `import { ${moduleName} } from '${path}';`;

    return content
      .replace('// Append new module in this place', '// Append new module in this place\n' + importContent)
      .replace('// Append moduleName in this place', '// Append moduleName in this place\n    ' + moduleName + ',');
  }

  getImportJoin(params) {
    let importJoin = '';
    // Join table
    if (params.joinTable) {
      const splitJoinTable = params.joinTable.split(',');
      splitJoinTable.forEach((joinTable) => {
        const splitJoinInfo = joinTable.split(';'),
          splitJoinInfoLength = splitJoinInfo.length;
        if (splitJoinInfoLength === 6) {
          const joinName = splitJoinInfo[0].trim(),
            con_1 = splitJoinInfo[4].split('-'),
            con_2 = splitJoinInfo[5].split('-');
          if (con_1.length === 2 && con_2.length === 2) {
            if (joinName === 'innerJoin') {
              importJoin +=
                '.innerJoinAndMapMany(`${this.entityAlias}.' +
                splitJoinInfo[1].trim() +
                '`, ' +
                splitJoinInfo[2].trim() +
                ', this.' +
                splitJoinInfo[3].trim() +
                ', `${this.' +
                con_1[0].trim() +
                '}.' +
                con_1[1].trim() +
                ' = ' +
                '${this.' +
                con_2[0].trim() +
                '}.' +
                con_2[1].trim() +
                '`' +
                ')\n';
            } else if (joinName === 'leftJoin') {
              importJoin +=
                '.leftJoinAndMapMany(`${this.entityAlias}.' +
                splitJoinInfo[1].trim() +
                '`, ' +
                splitJoinInfo[2].trim() +
                ', this.' +
                splitJoinInfo[3].trim() +
                ', `${this.' +
                con_1[0].trim() +
                '}.' +
                con_1[1].trim() +
                ' = ' +
                '${this.' +
                con_2[0].trim() +
                '}.' +
                con_2[1].trim() +
                '`' +
                ')\n';
            } else if (joinName === 'rightJoin') {
              importJoin +=
                '.rightJoinAndMapMany(`${this.entityAlias}.' +
                splitJoinInfo[1].trim() +
                '`, ' +
                splitJoinInfo[2].trim() +
                ', this.' +
                splitJoinInfo[3].trim() +
                ', `${this.' +
                con_1[0].trim() +
                '}.' +
                con_1[1].trim() +
                ' = ' +
                '${this.' +
                con_2[0].trim() +
                '}.' +
                con_2[1].trim() +
                '`' +
                ')\n';
            }
          } else {
            console.warn('Invalid input joinTable - condition');
          }
        } else if (splitJoinInfoLength === 3) {
          const joinName = splitJoinInfo[0].trim();
          if (joinName === 'innerJoin') {
            importJoin +=
              '.innerJoinAndSelect(`${this.entityAlias}.' +
              splitJoinInfo[1].trim() +
              '`, this.' +
              splitJoinInfo[2].trim() +
              ')\n';
          } else if (joinName === 'leftJoin') {
            importJoin +=
              '.leftJoinAndSelect(`${this.entityAlias}.' +
              splitJoinInfo[1].trim() +
              '`, this.' +
              splitJoinInfo[2].trim() +
              ')\n';
          } else if (joinName === 'rightJoin') {
            importJoin +=
              '.rightJoinAndSelect(`${this.entityAlias}.' +
              splitJoinInfo[1].trim() +
              '`, this.' +
              splitJoinInfo[2].trim() +
              ')\n';
          }
        } else {
          console.warn('Replace content for service query - invalid input joinTable.');
        }
      });
    }

    return importJoin;
  }

  getImportSelect(params) {
    // Select column name
    let importSelect = '';
    // Main column name
    if (params.selectColumnName) {
      importSelect += '.select([\n';
      const splitSelectColumn = params.selectColumnName.split(',');
      splitSelectColumn.forEach((columnName) => {
        importSelect += '`${this.entityAlias}.' + columnName.trim() + '`,\n';
      });
    }
    // Alias column name
    if (params.selectAliasColumnName) {
      if (!importSelect) {
        importSelect += '.select([\n';
      }

      const splitAliasSelectColumn = params.selectAliasColumnName.split(',');
      splitAliasSelectColumn.forEach((columnInfo) => {
        const splitColumnInfo = columnInfo.split('.');
        if (splitColumnInfo.length === 2) {
          importSelect += '`${this.' + splitColumnInfo[0].trim() + '}.' + splitColumnInfo[1].trim() + '`,\n';
        } else {
          console.warn('Replace content for service query - invalid input selectAliasColumnName.');
        }
      });
    }
    if (importSelect) {
      importSelect += '])';
    }

    return importSelect;
  }

  getOtherSaveInfo(params, isOutputErr = true, isUpdate = false) {
    let otherSaveInfo = '';
    if (params.otherSaveInfo) {
      const splitOtherSaveInfo = params.otherSaveInfo.split(',');
      splitOtherSaveInfo.forEach((saveInfo) => {
        const splitSaveInfo = saveInfo.split(';');
        if (splitSaveInfo.length === 5) {
          const splitFirstInfo = splitSaveInfo[0].split(':');
          if (splitFirstInfo.length === 3) {
            const keyValue = splitFirstInfo[0].trim(),
              upperKeyInfo = _.upperFirst(keyValue),
              existsVariableName = 'exists' + upperKeyInfo,
              arrVariableName = 'arr' + upperKeyInfo,
              resultVariableName = 'result' + upperKeyInfo,
              splitLastInfo = splitSaveInfo[4].split(':');
            let info = "if (params['" + keyValue + "']) {\n";
            info += 'const ' + existsVariableName + ' = ';
            info += 'await this.' + splitSaveInfo[1].trim() + ".createQueryBuilder().where('";
            if (splitFirstInfo[1] === 'array') {
              // Search info condition in
              info += splitFirstInfo[2].trim() + " in (:...values)'";
              info += ", { values: params['" + keyValue + "']";
              info += '})';
              info += '.getMany();\n';
              // Check exist value
              if (isOutputErr) {
                info += 'if (!' + existsVariableName + '.length) {\n';
                info += "throw new BadRequestException('" + keyValue + " not found.');\n}\n";
              }

              // Get saved info info
              info += 'const ' + arrVariableName + ' = ';
              info += existsVariableName + '.map((item: any) => {\n';
              info += 'const savedObj = new ' + splitSaveInfo[3].trim() + '();\n';
              splitLastInfo.forEach((keyInfo, idx) => {
                if (idx === 0) {
                  info += 'savedObj.' + keyInfo.trim() + ' = ' + 'response;\n';
                } else {
                  info += 'savedObj.' + keyInfo.trim() + ' = ' + 'item;\n';
                }
              });
              info += 'return this.' + splitSaveInfo[2].trim() + '.create(savedObj);\n';
              info += '});\n';
              // Save info
              info += 'if (' + arrVariableName + '.length) {\n';
              info += 'const ' + resultVariableName + ':any = await this.' + splitSaveInfo[2].trim() + '.save(';
              info += arrVariableName + ');\n';
              // Add to response
              splitLastInfo.forEach((keyInfo, idx) => {
                if (idx !== 0) {
                  info += "response['" + keyValue + "'] = ";
                  info += resultVariableName + '.map((item) => {';
                  info += "return item['" + keyInfo.trim() + "'];});\n";
                }
              });
              if (isUpdate) {
                info += '} else {';
                info += "response['" + keyValue + "'] = [];";
              }
              info += '}';
              info += '}\n';
            } else {
              info = '';
              // TODO
              // Search info condition equal
            }

            if (info) {
              otherSaveInfo += info;
            }
          } else {
            console.warn('Invalid other save info - first info');
          }
        } else {
          console.warn('Invalid other save info');
        }
      });
    }

    return otherSaveInfo;
  }
}

module.exports = new GenerateUtil();
