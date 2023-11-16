const _ = require('lodash');

class GenerateE2EUtil {
  replaceContentForQueryList(content, params) {
    // Get saveInfo
    const splitSaveInfo = params.saveInfo.split('-');
    let data = {},
      saveInfo = '';
    if (splitSaveInfo.length === 2) {
      try {
        saveInfo = 'await TestData.' + splitSaveInfo[0] + '(con,';
        saveInfo += splitSaveInfo[1] + ');\n';
        data = JSON.parse(splitSaveInfo[1]);
      } catch (error) {
        console.error('Parse json error - save info', error);
      }
    }

    // Get output to generate query graphql
    let splitOutput = params.output.split(','),
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
    const otherSaveInfo = this.getOtherSaveInfo(params, data),
      // Get other delete info
      otherDeleteInfo = this.getOtherDeleteInfo(params);

    return content
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{outputQuery}}/g, outputGraphql)
      .replace(/{{preparedData}}/g, JSON.stringify(data))
      .replace(/{{saveInfo}}/g, saveInfo)
      .replace(/{{deleteFunc}}/g, params.deleteInfo)
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo);
  }

  replaceContentForQueryOne(content, params) {
    // Get saveInfo
    const splitSaveInfo = params.saveInfo.split('-');
    let data = {},
      saveInfo = '';
    if (splitSaveInfo.length === 2) {
      try {
        saveInfo = 'await TestData.' + splitSaveInfo[0] + '(con,';
        saveInfo += splitSaveInfo[1] + ');\n';
        data = JSON.parse(splitSaveInfo[1]);
      } catch (error) {
        console.error('Parse json error', error);
      }
    }

    // Get output to generate query graphql
    let splitOutput = params.output.split(','),
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
    const otherSaveInfo = this.getOtherSaveInfo(params, data),
      // Get other delete info
      otherDeleteInfo = this.getOtherDeleteInfo(params);

    return content
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{outputQuery}}/g, outputGraphql)
      .replace(/{{preparedData}}/g, JSON.stringify(data))
      .replace(/{{saveInfo}}/g, saveInfo)
      .replace(/{{deleteFunc}}/g, params.deleteInfo)
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo);
  }

  replaceContentForAdd(content, params) {
    // Get graphql info
    let splitGraphqlInfo = params.graphqlInfo.split('->'),
      outputGraphql = '',
      requestParam = '',
      paramValues = {};

    if (splitGraphqlInfo.length === 3) {
      requestParam = splitGraphqlInfo[0];
      paramValues = splitGraphqlInfo[1];

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

    // Get other save info
    const otherSaveInfo = this.getOtherSaveInfo(params, []),
      // Get other delete info
      otherDeleteInfo = this.getOtherDeleteInfo(params);

    let transaction = '';
    if (params.otherTableSaveInfo) {
      transaction = 'initializeTransactionalContext();';
    }

    return content
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{requestParam}}/g, requestParam)
      .replace(/{{outputAdd}}/g, outputGraphql)
      .replace(/{{params}}/g, paramValues)
      .replace(/{{deleteFunc}}/g, params.deleteInfo)
      .replace(/{{expectedResult}}/g, params.apiResult)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo)
      .replace(/{{transaction}}/g, transaction);
  }

  replaceContentForUpdate(content, params) {
    // Get graphql info
    let splitGraphqlInfo = params.graphqlInfo.split('->'),
      outputGraphql = '',
      id = 0,
      requestParam = '',
      paramValues = {};

    if (splitGraphqlInfo.length === 4) {
      requestParam = splitGraphqlInfo[1];

      // Get id
      const splitId = splitGraphqlInfo[0].split(':');
      if (splitId.length === 2) {
        id = Number(splitId[1]) ? Number(splitId[1]) : 1;
      } else {
        console.warn('Invalid param graphqlInfo for updating - invalid id.');
      }

      // Params value
      paramValues = splitGraphqlInfo[2];

      // Get output graphql
      const splitOutput = splitGraphqlInfo[3].split(',');
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

    // Get input params
    const inputParams = '{"id":' + id + ',"params":' + paramValues + '}';

    // Get saveInfo
    const splitSaveInfo = params.saveInfo.split('-');
    let data = {},
      saveInfo = '';
    if (splitSaveInfo.length === 2) {
      try {
        saveInfo = 'await TestData.' + splitSaveInfo[0] + '(con,';
        saveInfo += splitSaveInfo[1] + ');\n';
        data = JSON.parse(splitSaveInfo[1]);
      } catch (error) {
        console.error('Parse json error', error);
      }
    }

    // Get other save info
    const otherSaveInfo = this.getOtherSaveInfo(params, data),
      // Get other delete info
      otherDeleteInfo = this.getOtherDeleteInfo(params);

    let transaction = '';
    if (params.otherTableSaveInfo) {
      transaction = 'initializeTransactionalContext();';
    }

    return content
      .replace(/{{devName}}/g, params.devName)
      .replace(/{{apiName}}/g, params.apiName)
      .replace(/{{requestParam}}/g, requestParam)
      .replace(/{{outputUpdate}}/g, outputGraphql)
      .replace(/{{preparedData}}/g, JSON.stringify(data))
      .replace(/{{saveInfo}}/g, saveInfo)
      .replace(/{{params}}/g, inputParams)
      .replace(/{{deleteFunc}}/g, params.deleteInfo)
      .replace(/{{expectedResult}}/g, params.apiResult)
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo)
      .replace(/{{transaction}}/g, transaction);
  }

  replaceContentForDelete(content, params) {
    // Get saveInfo
    const splitSaveInfo = params.saveInfo.split('-');
    let data = {},
      saveInfo = '';
    if (splitSaveInfo.length === 2) {
      try {
        saveInfo = 'await TestData.' + splitSaveInfo[0] + '(con,';
        saveInfo += splitSaveInfo[1] + ');\n';
        data = JSON.parse(splitSaveInfo[1]);
      } catch (error) {
        console.error('Parse json error', error);
      }
    } else {
      console.warn('Invalid param saveInfo.');
    }

    // Get other save info
    const otherSaveInfo = this.getOtherSaveInfo(params, data),
      // Get other delete info
      otherDeleteInfo = this.getOtherDeleteInfo(params);

    // Get find info to check result
    let findInfo = '';
    if (params.findInfo) {
      const splitFindInfo = params.findInfo.split('<->'),
        lengthSplitFindInfo = splitFindInfo.length;
      splitFindInfo.forEach((info, idx) => {
        try {
          const splitInfo = info.split('-');
          if (splitInfo.length === 2) {
            if (idx === 0) {
              findInfo += 'await Promise.all([';
            }

            const conditions = JSON.parse(splitInfo[1]);
            if (Array.isArray(conditions) && conditions.length) {
              conditions.forEach((condition) => {
                let tmpReplace = 'TestData.' + splitInfo[0];
                tmpReplace += '(con, {where: ' + JSON.stringify(condition) + '}),';

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
      .replace(/{{otherSaveInfo}}/g, otherSaveInfo)
      .replace(/{{otherDeleteInfo}}/g, otherDeleteInfo)
      .replace(/{{findInfo}}/g, findInfo)
      .replace(/{{transaction}}/g, transaction);
  }

  replaceContentForValidation(content, params) {
    let replacedInfo = '';

    const splitValidationInfo = params.split('<->');
    splitValidationInfo.forEach((info) => {
      const splitInfo = info.split(';');
      if (splitInfo.length === 2) {
        replacedInfo += content.replace(/{{inputName}}/g, splitInfo[0]).replace(/{{params}}/g, splitInfo[1]);
        replacedInfo += '\n';
      } else {
        console.warn('Invalid param validateStringInfo.');
      }
    });

    return replacedInfo;
  }

  replaceAppendContent(mainContent, appendContent) {
    return mainContent.replace(
      '// Append test case in this place',
      '// Append test case in this place\n' + appendContent
    );
  }

  getOtherSaveInfo(params, data) {
    let otherSaveInfo = '';
    if (params.otherTableSaveInfo) {
      const splitOtherSaveInfo = params.otherTableSaveInfo.split('<->');
      splitOtherSaveInfo.forEach((otherInfo) => {
        try {
          const splitOtherInfo = otherInfo.split('-');
          if (splitOtherInfo.length === 3) {
            const jsonOther = JSON.parse(splitOtherInfo[2]);
            let replacedOtherInfo = 'await TestData.';
            replacedOtherInfo += splitOtherInfo[1] + '(con,';
            replacedOtherInfo += splitOtherInfo[2] + ');';

            otherSaveInfo += replacedOtherInfo + '\n';

            // Add data for main obj
            if (Array.isArray(data) && data.length && Array.isArray(jsonOther)) {
              const splitTypeInfo = splitOtherInfo[0].split(':');
              if (splitTypeInfo.length === 2) {
                const key = splitTypeInfo[0];
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
          }
        } catch (error) {
          console.error('Parse json error - other save info', error);
        }
      });
    }

    return otherSaveInfo;
  }

  getOtherDeleteInfo(params) {
    let otherDeleteInfo = '';
    if (params.otherTableDeleteInfo) {
      const splitOtherDeleteInfo = params.otherTableDeleteInfo.split('<->');
      splitOtherDeleteInfo.forEach((otherInfo) => {
        try {
          const splitOtherDeleteInfo = otherInfo.split('-');
          if (splitOtherDeleteInfo.length === 2) {
            let conditions = splitOtherDeleteInfo[1];
            if (conditions.indexOf('[') > -1 && conditions.indexOf(']') > -1) {
              conditions = JSON.parse(splitOtherDeleteInfo[1]);

              if (Array.isArray(conditions) && conditions.length) {
                let replacedOtherDeleteInfo = 'await Promise.all([';

                conditions.forEach((condition) => {
                  let tmpReplace = 'TestData.' + splitOtherDeleteInfo[0];
                  tmpReplace += '(con,' + JSON.stringify(condition) + '),';

                  replacedOtherDeleteInfo += tmpReplace;
                });

                replacedOtherDeleteInfo += ']);';

                otherDeleteInfo += replacedOtherDeleteInfo + '\n';
              }
            } else {
              let replacedOtherDeleteInfo = 'await Promise.all([';
              replacedOtherDeleteInfo += 'TestData.' + splitOtherDeleteInfo[0];
              replacedOtherDeleteInfo += '(con,' + conditions + '),';
              replacedOtherDeleteInfo += ']);';

              otherDeleteInfo += replacedOtherDeleteInfo + '\n';
            }
          }
        } catch (error) {
          console.error('Parse json error - other delete info', error);
        }
      });
    }

    return otherDeleteInfo;
  }
}

module.exports = new GenerateE2EUtil();
