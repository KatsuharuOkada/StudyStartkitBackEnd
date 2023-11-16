/* eslint-disable */
const _ = require('lodash');

class GenerateE2EUtil {
  replaceContentForQueryList(content, params) {
    // Get import entity
    const { importEntity } = this.getImportEntity(params);

    // Get saveInfo
    let { data, saveInfo, deleteInfo } = this.getSaveInfo(params);

    // Get graphql info to generate query graphql
    let splitOutput = params.graphqlInfo.split(','),
      outputGraphql = '';
    splitOutput.forEach((param) => {
      const splitParam = param.split('-');
      if (splitParam.length > 1) {
        // Get child output
        let outputObj = splitParam[0] + ' {';
        const splitChildObj = splitParam[1].split(';');
        splitChildObj.forEach((childParam) => {
          outputObj += childParam + ' ';
        });
        outputObj += '}';

        outputGraphql += outputObj;
      } else {
        outputGraphql += splitParam[0] + ' ';
      }
    });

    // Get other save info
    const { otherSaveInfo, otherDeleteInfo } = this.getOtherSaveInfo(params, data);

    return content
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{outputQuery}}/g, outputGraphql)
      .replace(/{{preparedData}}/g, JSON.stringify(data))
      .replace(/{{saveInfo}}/g, saveInfo)
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{importEntity}}/g, importEntity)
      .replace(/{{deleteInfo}}/g, deleteInfo)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo);
  }

  replaceContentForQueryOne(content, params) {
    // Get import entity
    const { importEntity } = this.getImportEntity(params);

    // Get saveInfo
    let { data, saveInfo, deleteInfo } = this.getSaveInfo(params);

    // Get graphql info to generate query graphql
    let splitOutput = params.graphqlInfo.split(','),
      outputGraphql = '';
    splitOutput.forEach((param) => {
      const splitParam = param.split('-');
      if (splitParam.length > 1) {
        // Get child output
        let outputObj = splitParam[0] + ' {';
        const splitChildObj = splitParam[1].split(';');
        splitChildObj.forEach((childParam) => {
          outputObj += childParam + ' ';
        });
        outputObj += '}';

        outputGraphql += outputObj;
      } else {
        outputGraphql += splitParam[0] + ' ';
      }
    });

    // Get other save info
    const { otherSaveInfo, otherDeleteInfo } = this.getOtherSaveInfo(params, data);

    return content
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{outputQuery}}/g, outputGraphql)
      .replace(/{{preparedData}}/g, JSON.stringify(data))
      .replace(/{{saveInfo}}/g, saveInfo)
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{importEntity}}/g, importEntity)
      .replace(/{{deleteInfo}}/g, deleteInfo)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo);
  }

  replaceContentForAdd(content, params) {
    // Get graphql info
    let outputGraphql = '',
      requestParam = '',
      paramValues = '',
      jsonParamValues,
      data = new Array(),
      isOneRecord = true;

    try {
      const splitGraphqlInfo = params.graphqlInfo.split('->');

      if (splitGraphqlInfo.length === 3) {
        requestParam = splitGraphqlInfo[0];
        paramValues = splitGraphqlInfo[1];

        const jsonObj = JSON.parse(splitGraphqlInfo[1]);
        jsonParamValues = JSON.parse(splitGraphqlInfo[1]);
        if (paramValues.indexOf('[') > -1 && paramValues.indexOf(']') > -1 && Array.isArray(jsonObj)) {
          data = [...jsonObj];
          isOneRecord = false;
        } else {
          data.push(jsonObj);
        }

        // Get output graphql
        const splitOutput = splitGraphqlInfo[2].split(',');
        splitOutput.forEach((info) => {
          const splitParam = info.split('-');
          if (splitParam.length > 1) {
            const key = splitParam[0];
            // Get child output
            let outputObj = key + ' {';
            const splitChildObj = splitParam[1].split(';');
            splitChildObj.forEach((childParam) => {
              outputObj += childParam + ' ';
            });
            outputObj += '}';

            outputGraphql += outputObj;
          } else {
            outputGraphql += splitParam[0] + ' ';
          }
        });
      } else {
        console.warn('Invalid param graphqlInfo for adding - output graphql.');
      }
    } catch (error) {
      console.error('Parse json error - graphql info', error);
    }

    // Get import entity
    const { importEntity, entities } = this.getImportEntity(params);

    // Get other save info
    const { otherSaveInfo, mergeDeleteList } = this.getOtherSaveInfo(params, data);

    // Get delete info
    let deleteInfo = '';
    if (entities.length) {
      entities.reverse().forEach((entity) => {
        const existsInfo = _.find(mergeDeleteList, { entity });
        if (existsInfo) {
          deleteInfo += existsInfo.deleteInfo;
        } else {
          let replacedDeleteInfo = 'await TestData.deleteAll(con,' + entity + ');';
          deleteInfo += replacedDeleteInfo;
        }

        deleteInfo += '\n';
      });
    }

    let transaction = '';
    if (params.otherTableSaveInfo) {
      transaction = 'initializeTransactionalContext();';
    }

    return {
      content: content
        .replace(/{{devName}}/g, params.devName)
        .replace(/{{apiName}}/g, params.apiName)
        .replace(/{{requestParam}}/g, requestParam)
        .replace(/{{outputAdd}}/g, outputGraphql)
        .replace(/{{params}}/g, paramValues)
        .replace(/{{expectedResult}}/g, JSON.stringify(isOneRecord ? data[0] : data))
        .replace(/{{importEntity}}/g, importEntity)
        .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
        .replace(/{{deleteInfo}}/g, deleteInfo)
        .replace(/{{transaction}}/g, transaction),
      paramValues: jsonParamValues,
    };
  }

  replaceContentForUpdate(content, params) {
    // Get import entity
    const { importEntity } = this.getImportEntity(params);

    // Get saveInfo
    let { data, saveInfo, deleteInfo, id } = this.getSaveInfo(params);

    // Get graphql info
    let outputGraphql = '',
      requestParam = '',
      paramValues = {},
      jsonParamValues;

    try {
      const splitGraphqlInfo = params.graphqlInfo.split('->');

      if (splitGraphqlInfo.length === 3) {
        requestParam = splitGraphqlInfo[0];
        paramValues = splitGraphqlInfo[1];

        // Update value for checking
        const jsonObj = JSON.parse(splitGraphqlInfo[1]);
        jsonParamValues = JSON.parse(splitGraphqlInfo[1]);
        if (typeof jsonObj === 'object') {
          let updateObj = data[0];
          for (let key in jsonObj) {
            if (updateObj[key]) {
              updateObj[key] = jsonObj[key];
            }
          }

          data[0] = updateObj;
        }

        // Get output graphql
        const splitOutput = splitGraphqlInfo[2].split(',');
        splitOutput.forEach((info) => {
          const splitParam = info.split('-');
          if (splitParam.length > 1) {
            const key = splitParam[0];
            // Get child output
            let outputObj = key + ' {';
            const splitChildObj = splitParam[1].split(';');
            splitChildObj.forEach((childParam) => {
              outputObj += childParam + ' ';
            });
            outputObj += '}';

            outputGraphql += outputObj;
          } else {
            outputGraphql += splitParam[0] + ' ';
          }
        });
      } else {
        console.warn('Invalid param graphqlInfo for updating - output graphql.');
      }
    } catch (error) {
      console.error('Parse json error - graphql info', error);
    }

    // Get other save info
    const { otherSaveInfo, otherDeleteInfo } = this.getOtherSaveInfo(params, data);

    let transaction = '';
    if (params.otherTableSaveInfo) {
      transaction = 'initializeTransactionalContext();';
    }

    return {
      content: content
        .replace(/{{devName}}/g, params.devName)
        .replace(/{{apiName}}/g, params.apiName)
        .replace(/{{requestParam}}/g, requestParam)
        .replace(/{{outputUpdate}}/g, outputGraphql)
        .replace(/{{preparedData}}/g, JSON.stringify(data))
        .replace(/{{saveInfo}}/g, saveInfo)
        .replace(/{{id}}/g, id)
        .replace(/{{params}}/g, paramValues)
        .replace(/{{importEntity}}/g, importEntity)
        .replace(/{{deleteInfo}}/g, deleteInfo)
        .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
        .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo)
        .replace(/{{transaction}}/g, transaction),
      paramValues: jsonParamValues,
      id: id,
    };
  }

  replaceContentForDelete(content, params) {
    // Get import entity
    const { importEntity } = this.getImportEntity(params);

    // Get saveInfo
    let { data, saveInfo } = this.getSaveInfo(params);

    // Get other save info
    const { otherSaveInfo, otherDeleteInfo } = this.getOtherSaveInfo(params, data);

    // Get find info to check result
    let findInfo = '';
    if (params.findInfo) {
      const splitFindInfo = params.findInfo.split('<->'),
        lengthSplitFindInfo = splitFindInfo.length;
      splitFindInfo.forEach((info, idx) => {
        try {
          const splitInfo = info.split('->');
          if (splitInfo.length === 2) {
            if (idx === 0) {
              findInfo += 'await Promise.all([';
            }

            const conditions = JSON.parse(splitInfo[1]);
            if (Array.isArray(conditions) && conditions.length) {
              conditions.forEach((condition) => {
                let tmpReplace = 'TestData.findInfo(con,' + splitInfo[0].trim();
                tmpReplace += ', { where: ' + JSON.stringify(condition) + ' }),';

                findInfo += tmpReplace;
              });
            }
          }

          if (findInfo && idx + 1 >= lengthSplitFindInfo) {
            findInfo += ']);';
          }
        } catch (error) {
          console.error('Parse json error - find info', error);
        }
      });
    }

    let transaction = '';
    if (params.otherTableSaveInfo) {
      transaction = 'initializeTransactionalContext();';
    }

    return content
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{preparedData}}/g, JSON.stringify(data))
      .replace(/{{saveInfo}}/g, saveInfo)
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{importEntity}}/g, importEntity)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo)
      .replace(/{{findInfo}}/g, findInfo)
      .replace(/{{transaction}}/g, transaction);
  }

  replaceContentForValidation(content, params, normalParamValues, id = '') {
    let replacedInfo = '';

    try {
      const splitValidationInfo = params.split('<->');
      splitValidationInfo.forEach((info) => {
        const splitInfo = info.split(';');
        if (splitInfo.length === 2) {
          let requestParams,
            jsonParam = JSON.parse(splitInfo[1]);
          if (Array.isArray(normalParamValues)) {
            requestParams = [...normalParamValues];
            for (let key in jsonParam) {
              if (jsonParam[key]) {
                requestParams[0][key] = jsonParam[key];
              } else {
                console.warn('Invalid param validateStringInfo - invalid value.');
              }
            }
          } else if (typeof normalParamValues === 'object') {
            requestParams = Object.assign({}, normalParamValues);
            for (let key in jsonParam) {
              if (jsonParam[key]) {
                requestParams[key] = jsonParam[key];
              } else {
                console.warn('Invalid param validateStringInfo - invalid value.');
              }
            }
          } else {
            requestParams = jsonParam;
          }

          // Params
          let params;
          if (id) {
            params = {
              id: id,
              params: requestParams,
            };
          } else {
            params = { params: requestParams };
          }

          replacedInfo += content
            .replace(/{{inputName}}/g, splitInfo[0].trim())
            .replace(/{{params}}/g, JSON.stringify(params));
          replacedInfo += '\n';
        } else {
          console.warn('Invalid param validateStringInfo.');
        }
      });
    } catch (error) {
      console.error('Parse json error - validation info', error);
    }

    return replacedInfo;
  }

  replaceAppendContent(mainContent, appendContent) {
    return mainContent.replace(
      '// Append test case in this place',
      '// Append test case in this place\n' + appendContent
    );
  }

  getSaveInfo(params) {
    // Get saveInfo
    const splitSaveInfo = params.saveInfo.split('->');
    let data = {},
      saveInfo = '',
      deleteInfo = '',
      id;
    if (splitSaveInfo.length === 2) {
      try {
        saveInfo = 'await TestData.saveInfo(con,';
        saveInfo += splitSaveInfo[0].trim() + ',';
        saveInfo += splitSaveInfo[1] + ');\n';
        data = JSON.parse(splitSaveInfo[1]);

        if (Array.isArray(data) && data.length) {
          let replacedDeleteInfo = 'await Promise.all([';
          data.forEach((item) => {
            let [key, value] = Object.entries(item)[0],
              condition = '{"' + key.trim() + '":' + value + '}';
            replacedDeleteInfo += 'TestData.deleteInfo(con,';
            replacedDeleteInfo += splitSaveInfo[0].trim() + ',';
            replacedDeleteInfo += condition + '),';
          });

          replacedDeleteInfo += ']);';
          deleteInfo += replacedDeleteInfo + '\n';

          // Get id
          id = data[0].id ? data[0].id : '';
        }
      } catch (error) {
        console.error('Parse json error - save info', error);
      }
    }

    return {
      data,
      saveInfo,
      deleteInfo,
      id,
    };
  }

  getOtherSaveInfo(params, data) {
    let otherSaveInfo = '',
      otherDeleteInfo = '',
      mergeDeleteList = new Array();
    if (params.otherTableSaveInfo) {
      let splitOtherSaveInfo = params.otherTableSaveInfo.split('<->'),
        deleteList = new Array();
      splitOtherSaveInfo.forEach((otherInfo) => {
        try {
          let splitOtherInfo = otherInfo.split('->');
          if (splitOtherInfo.length === 3) {
            let entityObj = splitOtherInfo[1].trim(),
              jsonOther = JSON.parse(splitOtherInfo[2]);
            let replacedOtherInfo = 'await TestData.saveInfo(con,';
            replacedOtherInfo += entityObj + ',';
            replacedOtherInfo += splitOtherInfo[2] + ');';

            otherSaveInfo += replacedOtherInfo + '\n';

            // Add data for main obj
            if (Array.isArray(data) && data.length && Array.isArray(jsonOther)) {
              const splitTypeInfo = splitOtherInfo[0].split(':');
              if (splitTypeInfo.length === 2) {
                const key = splitTypeInfo[0].trim();
                data = data.map((item) => {
                  let values = item[key];
                  if (splitTypeInfo[1].toLowerCase() === 'array') {
                    if (values && Array.isArray(values) && values.length) {
                      let replacedValues = new Array();
                      values.forEach((value) => {
                        const existsValue = _.find(jsonOther, { id: value });
                        if (existsValue) {
                          replacedValues.push(existsValue);
                        }
                      });

                      item[key] = replacedValues;
                    }
                  } else {
                    if (values) {
                      const existsValue = _.find(jsonOther, { id: values });
                      if (existsValue) {
                        item[key] = existsValue;
                      }
                    }
                  }
                  return item;
                });
              } else {
                console.warn('Invalid other save info - type info');
              }
            }

            // Get delete info
            if (Array.isArray(jsonOther) && jsonOther.length) {
              deleteList.push({
                entity: entityObj,
                list: jsonOther,
              });
            }
          }
        } catch (error) {
          console.error('Parse json error - other save info', error);
        }
      });

      // Get delete info
      // Reverse array to delete constraints table
      if (deleteList.length) {
        deleteList.reverse().forEach((deleteInfo) => {
          let replacedOtherDeleteInfo = 'await Promise.all([',
            entityObj = deleteInfo.entity,
            jsonOther = deleteInfo.list,
            objDeleteInfo = {
              entity: entityObj,
            };
          jsonOther.forEach((item) => {
            let [key, value] = Object.entries(item)[0];
            let condition = '';
            if (typeof value === 'object') {
              condition = '{"' + key + '":' + JSON.stringify(value) + '}';
            } else {
              condition = '{"' + key + '":' + value + '}';
            }
            replacedOtherDeleteInfo += 'TestData.deleteInfo(con,';
            replacedOtherDeleteInfo += entityObj + ',';
            replacedOtherDeleteInfo += condition + '),';
          });
          replacedOtherDeleteInfo += ']);';

          otherDeleteInfo += replacedOtherDeleteInfo + '\n';

          // Use to merge delete info for adding and updating api
          objDeleteInfo['deleteInfo'] = replacedOtherDeleteInfo;
          mergeDeleteList.push(objDeleteInfo);
        });
      }
    }

    return {
      otherSaveInfo,
      otherDeleteInfo,
      mergeDeleteList,
    };
  }

  getDeleteInfo(params) {
    let deleteInfo = '';
    if (params.deleteInfo) {
      const splitDeleteInfo = params.deleteInfo.split('<->');
      splitDeleteInfo.forEach((info) => {
        try {
          const splitInfo = info.split('->');
          if (splitInfo.length === 2) {
            let conditions = splitInfo[1];
            if (conditions.indexOf('[') > -1 && conditions.indexOf(']') > -1) {
              conditions = JSON.parse(splitInfo[1]);

              if (Array.isArray(conditions) && conditions.length) {
                let replacedDeleteInfo = 'await Promise.all([';

                conditions.forEach((condition) => {
                  let tmpReplace = 'TestData.deleteInfo(con,' + splitInfo[0].trim();
                  tmpReplace += ',' + JSON.stringify(condition) + '),';

                  replacedDeleteInfo += tmpReplace;
                });

                replacedDeleteInfo += ']);';

                deleteInfo += replacedDeleteInfo + '\n';
              }
            } else {
              let replacedDeleteInfo = 'await TestData.deleteInfo(con,' + splitInfo[0].trim();
              replacedDeleteInfo += ',' + conditions + ');';

              deleteInfo += replacedDeleteInfo + '\n';
            }
          }
        } catch (error) {
          console.error('Parse json error - other delete info', error);
        }
      });
    }

    return deleteInfo;
  }

  getImportEntity(params) {
    let replacedImportEntity = '',
      entities = new Array();
    if (params.importEntity) {
      const splitImportEntity = params.importEntity.split(',');
      splitImportEntity.forEach((importEntity) => {
        if (importEntity.indexOf(';') > -1) {
          const splitImportInfo = importEntity.split(';');

          if (splitImportInfo.length === 2) {
            const entity = splitImportInfo[0].trim();
            entities.push(entity);
            replacedImportEntity += 'import { ' + entity + " } from '" + splitImportInfo[1].trim() + "';\n";
          } else {
            console.warn('Invalid input importEntity.');
          }
        }
      });
    }

    return {
      importEntity: replacedImportEntity,
      entities,
    };
  }
}

module.exports = new GenerateE2EUtil();
