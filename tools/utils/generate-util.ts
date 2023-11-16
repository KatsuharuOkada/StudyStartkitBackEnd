const _ = require('lodash');
const constantUtil = require('../common/constant');

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
            const importPackageName = splitImportPackage[0];
            otherPackages += `import { ${importPackageName} } from '${splitImportPackage[1]}';\n`;

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
    return content.replace(/{{apiName}}/g, params.apiName).replace(/{{name}}/g, _.lowerCase(params.folderName));
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
            const importPackageName = splitImportPackage[0];
            if (importPackageName.indexOf('Service') > -1) {
              importService += `import { ${importPackageName} } from '${splitImportPackage[1]}';\n`;
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
    if (params.importAlias) {
      const splitImportAlias = params.importAlias.split(',');
      splitImportAlias.forEach((importAlias) => {
        if (importAlias.indexOf(';') > -1) {
          const splitImportInfo = importAlias.split(';');
          if (splitImportInfo.length === 3) {
            const aliasName = splitImportInfo[0],
              importName = splitImportInfo[1];
            importEntity += `import { ${importName} } from '${splitImportInfo[2]}';\n`;
            otherEntityAlias += `private ${aliasName}: string;\n`;
            initOtherEntityAlias += `this.${aliasName} = ${importName}.name;\n`;
          } else {
            console.warn('Generate service - invalid input importAlias.');
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
    let importJoin = '';
    // Join table
    if (params.joinTable) {
      const splitJoinTable = params.joinTable.split(',');
      splitJoinTable.forEach((joinTable) => {
        const splitJoinInfo = joinTable.split(';');
        if (splitJoinInfo.length === 3) {
          const joinName = splitJoinInfo[0];
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
          console.warn('Replace content for service query one - invalid input joinTable.');
        }
      });
    }
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
          console.warn('Replace content for service query one - invalid input selectAliasColumnName.');
        }
      });
    }
    if (importSelect) {
      importSelect += '])';
    }

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{importJoin}}/g, importJoin)
      .replace(/{{importSelect}}/g, importSelect)
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('get', '')));
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
    return content.replace(/{{apiName}}/g, params.apiName).replace(/{{name}}/g, _.lowerCase(params.folderName));
  }

  replaceContentForServiceUpdate(content, params) {
    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('update', '')));
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
    return content.replace(/{{apiName}}/g, params.apiName).replace(/{{name}}/g, _.lowerCase(params.folderName));
  }

  replaceContentForServiceDelete(content, params) {
    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('delete', '')));
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
    return content.replace(/{{apiName}}/g, params.apiName).replace(/{{name}}/g, _.lowerCase(params.folderName));
  }

  replaceContentForServiceAdd(content, params) {
    let lowerFolderName = _.lowerCase(params.folderName),
      objEntity = lowerFolderName + 'ObjEntity',
      objUpdateEntity = '';
    if (params.othersUpdateEntity) {
      objUpdateEntity = objEntity;

      const splitUpdateEntity = params.othersUpdateEntity.split(',');
      splitUpdateEntity.forEach((updateEntity) => {
        const splitUpdateContent = updateEntity.split(':');
        objUpdateEntity += '.' + splitUpdateContent[0] + ' = ' + splitUpdateContent[1] + '\n';
      });
    }

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{upperFirstLetterName}}/g, _.upperFirst(params.folderName))
      .replace(/{{lowerCaseName}}/g, lowerFolderName)
      .replace(/{{result}}/g, _.camelCase(params.apiName.replace('add', '')))
      .replace(/{{objEntity}}/g, objEntity)
      .replace(/{{othersUpdateEntity}}/g, objUpdateEntity);
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
    return content.replace(/{{apiName}}/g, params.apiName).replace(/{{name}}/g, _.lowerCase(params.folderName));
  }

  replaceContentForServiceQueryList(content, params) {
    const importJoin = this.getImportJoin(params),
      // Select column name
      importSelect = this.getImportSelect(params);

    return content
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{lowerCaseName}}/g, _.lowerCase(params.folderName))
      .replace(/{{importJoin}}/g, importJoin)
      .replace(/{{importSelect}}/g, importSelect + ';');
  }

  getImportJoin(params) {
    let importJoin = '';
    // Join table
    if (params.joinTable) {
      const splitJoinTable = params.joinTable.split(',');
      splitJoinTable.forEach((joinTable) => {
        const splitJoinInfo = joinTable.split(';');
        if (splitJoinInfo.length === 3) {
          const joinName = splitJoinInfo[0];
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
}

module.exports = new GenerateUtil();
