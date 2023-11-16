const generateQueryOne = require('./tools/generate-query-one'),
  generateQueryList = require('./tools/generate-query-list'),
  generateAdd = require('./tools/generate-add'),
  generateUpdate = require('./tools/generate-update'),
  generateDelete = require('./tools/generate-delete'),
  generateE2EQueryList = require('./tools/generate-e2e-query-list'),
  generateE2EQueryOne = require('./tools/generate-e2e-query-one'),
  generateE2EAdd = require('./tools/generate-e2e-add'),
  generateE2EUpdate = require('./tools/generate-e2e-update'),
  generateE2EDelete = require('./tools/generate-e2e-delete');

module.exports = (plop) => {
  plop.setGenerator('VFA generate code - Get query list.', {
    description: 'This is a command for generating code get query list.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      // Use to import into module
      // If having xxxService -> Use to import into modules and service
      {
        type: 'input',
        name: 'importPackages',
        message:
          'Do you want to import other packages for generating modules and services - Optional (Ex. UsersService;../users/users.service,UsersRepository;../../repositories/users.repository,etc...)?  -> ',
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. getPhotos) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'isAuthentication',
        message: 'Do you need check authentication for this (yes/no)? -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'isAuthentication is required.';
        },
      },
      {
        type: 'input',
        name: 'importOtherAlias',
        message:
          'What is your alias for other entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
      },
      {
        type: 'input',
        name: 'joinTable',
        message:
          'What is joinTable and condition join if no please ignore it. (Join split by comma. others split by semi-colon) (Ex. innerJoin;owner;userAlias,leftJoin;comments;commentAlias,leftJoin;skills;SkillsEntity;skillAlias;projectsSkillAlias-skill_id;skillAlias-id,etc...) -> ',
      },
      {
        type: 'input',
        name: 'selectColumnName',
        message:
          'What is column names that you want to select? - Optional. (Split by comma) (Ex. id,url,comment,etc...) -> ',
      },
      {
        type: 'input',
        name: 'selectAliasColumnName',
        message:
          'What is column names for alias that you want to select? - Optional. (Split by comma) (Ex. userAlias.id,userAlias.userName,commentAlias.id,commentAlias.comment,etc...) -> ',
      },
      {
        type: 'input',
        name: 'outputParam',
        message:
          'What is your output param? (Ex. PhotosResponse->statusCode: Int!;message: String;data: PhotosData;error: String,PhotosData->data: [PhotoDto];paging: Paging,PhotoDto->id: Int;url: String;comment: String;owner: UserDto,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'outputParam is required.';
        },
      },
      {
        type: 'input',
        name: 'isSkipOverrideModule',
        message: 'Do you want to skip override module (yes/no)? - Optional. -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateQueryList(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate code - Get query one.', {
    description: 'This is a command for generating code get query one.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      // Use to import into module
      // If having xxxService -> Use to import into modules and service
      {
        type: 'input',
        name: 'importPackages',
        message:
          'Do you want to import other packages - Optional (Ex. UsersService;../users/users.service,UsersRepository;../../repositories/users.repository,etc...)?  -> ',
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. getPhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'isAuthentication',
        message: 'Do you need check authentication for this (yes/no)? -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'isAuthentication is required.';
        },
      },
      {
        type: 'input',
        name: 'importOtherAlias',
        message:
          'What is your alias for other entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
      },
      {
        type: 'input',
        name: 'joinTable',
        message:
          'What is joinTable and condition join if no please ignore it. (Join split by comma. others split by semi-colon) (Ex. innerJoin;owner;userAlias,leftJoin;comments;commentAlias,leftJoin;skills;SkillsEntity;skillAlias;projectsSkillAlias-skill_id;skillAlias-id,etc...) -> ',
      },
      {
        type: 'input',
        name: 'selectColumnName',
        message:
          'What is column names that you want to select? - Optional. (Split by comma) (Ex. id,url,comment,etc...) -> ',
      },
      {
        type: 'input',
        name: 'selectAliasColumnName',
        message:
          'What is column names for alias that you want to select? - Optional.(Split by comma)  (Ex. userAlias.id,userAlias.userName,commentAlias.id,commentAlias.comment,etc...) -> ',
      },
      {
        type: 'input',
        name: 'outputParam',
        message:
          'What is your output param? (Ex. PhotoResponse->statusCode: Int!;message: String;data: PhotoDto;error: String,PhotoDto->id: Int;url: String;comment: String;owner: UserDto,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'outputParam is required.';
        },
      },
      {
        type: 'input',
        name: 'isSkipOverrideModule',
        message: 'Do you want to skip override module (yes/no)? - Optional. -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateQueryOne(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate code - add.', {
    description: 'This is a command for generating code add.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      // Use to import into module
      // If having xxxService -> Use to import into modules and service
      {
        type: 'input',
        name: 'importPackages',
        message:
          'Do you want to import other packages - Optional (Ex. UsersService;../users/users.service,UsersRepository;../../repositories/users.repository,etc...)?  -> ',
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. addPhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'isAuthentication',
        message: 'Do you need check authentication for this (yes/no)? -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'isAuthentication is required.';
        },
      },
      {
        type: 'input',
        name: 'importOtherAlias',
        message:
          'What is your alias for other entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentsAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
      },
      {
        type: 'input',
        name: 'inputParam',
        message: 'What is your input param? (Ex. CreatePhotoDto->url: String!;comment: String!,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'inputParam is required.';
        },
      },
      {
        type: 'input',
        name: 'outputParam',
        message:
          'What is your output param? (Ex. PhotoResponse->statusCode: Int!;message: String;data: PhotoDto;error: String,PhotoDto->id: Int;url: String;comment: String;owner: UserDto,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'outputParam is required.';
        },
      },
      {
        type: 'input',
        name: 'othersUpdateEntity',
        message: 'What is your other values for updating (except for params)? - Optional (Ex. owner: owner,etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherSaveInfo',
        message:
          'What is your other save info (save to other tables by params)? - Optional (Ex. skills:array:id;skillsRepository;projectsSkillsRepository;ProjectsSkillsEntity;project:skill,etc...) -> ',
      },
      {
        type: 'input',
        name: 'isSkipOverrideModule',
        message: 'Do you want to skip override module (yes/no)? - Optional. -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateAdd(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate code - update.', {
    description: 'This is a command for generating code update.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      // Use to import into module
      // If having xxxService -> Use to import into modules and service
      {
        type: 'input',
        name: 'importPackages',
        message:
          'Do you want to import other packages - Optional (Ex. UsersService;../users/users.service,UsersRepository;../../repositories/users.repository,etc...)?  -> ',
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. updatePhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'isAuthentication',
        message: 'Do you need check authentication for this (yes/no)? -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'isAuthentication is required.';
        },
      },
      {
        type: 'input',
        name: 'importOtherAlias',
        message:
          'What is your alias for other entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
      },
      {
        type: 'input',
        name: 'inputParam',
        message: 'What is your input param? (Ex. UpdatePhotoDto->comment: String!,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'inputParam is required.';
        },
      },
      {
        type: 'input',
        name: 'outputParam',
        message:
          'What is your output param? (Ex. PhotoResponse->statusCode: Int!;message: String;data: PhotoDto;error: String,PhotoDto->id: Int;url: String;comment: String;owner: UserDto,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'outputParam is required.';
        },
      },
      {
        type: 'input',
        name: 'otherSaveInfo',
        message:
          'What is your other save info (save to other tables by params)? - Optional (Ex. skills:array:id;skillsRepository;projectsSkillsRepository;ProjectsSkillsEntity;project:skill,etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherTableDeleteInfo',
        message:
          'What is your delete info for other table? - Optional (Ex. projectsSkillsRepository-{project:{id: id}},etc...) -> ',
      },
      {
        type: 'input',
        name: 'isSkipOverrideModule',
        message: 'Do you want to skip override module (yes/no)? - Optional. -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateUpdate(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate code - delete.', {
    description: 'This is a command for generating code delete.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      // Use to import into module
      // If having xxxService -> Use to import into modules and service
      {
        type: 'input',
        name: 'importPackages',
        message:
          'Do you want to import other packages - Optional (Ex. UsersService;../users/users.service,UsersRepository;../../repositories/users.repository,etc...)?  -> ',
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. deletePhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'isAuthentication',
        message: 'Do you need check authentication for this (yes/no)? -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'isAuthentication is required.';
        },
      },
      {
        type: 'input',
        name: 'importOtherAlias',
        message:
          'What is your alias for other entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherTableDeleteInfo',
        message:
          'What is your delete info for other table? - Optional (Ex. projectsSkillsRepository-{project:{id: id}},etc...) -> ',
      },
      {
        type: 'input',
        name: 'isSkipOverrideModule',
        message: 'Do you want to skip override module (yes/no)? - Optional. -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateDelete(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate E2E code - get query list.', {
    description: 'This is a command for generating e2e code get query list.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. getPhotos) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'output',
        message:
          'What is your output? (Ex. id,url,comment,owner-id;userName;email;gender,comments-id;comment,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'output is required.';
        },
      },
      {
        type: 'input',
        name: 'saveInfo',
        message:
          'What is your save info for preparing data? (Ex. savePhotoInfo-[{"id":1,"url":"test_url_1","comment":"test_comment_1","owner": {"id":1,"userName":"unit_test","email":"unit_test@gmail.com","gender":"male"}},{"id":2,"url":"test_url_2","comment":"test_comment_2","owner": {"id":1,"userName":"unit_test","email":"unit_test@gmail.com","gender":"male"}}], etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'saveInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'deleteInfo',
        message: 'What is your delete function name? (Ex. deletePhotoInfo) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'deleteInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'otherTableSaveInfo',
        message:
          'What is your save info for other table? - Optional (Ex. comments:array-saveCommentInfo-[{"id":1,"comment":"c_1","owner":{"id":1},"photo":{"id":1}},{"id":2,"comment":"c_2","owner":{"id":1},"photo":{"id":2}}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherTableDeleteInfo',
        message:
          'What is your delete info for other table? - Optional (Ex. deleteCommentInfo-[{"id":1},{"id":2}], etc...) -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateE2EQueryList(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate E2E code - get query one.', {
    description: 'This is a command for generating e2e code get query one.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. getPhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'output',
        message:
          'What is your output? (Ex. id,url,comment,owner-id;userName;email;gender,comments-id;comment,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'output is required.';
        },
      },
      {
        type: 'input',
        name: 'saveInfo',
        message:
          'What is your save info for preparing data? (Ex. savePhotoInfo-[{"id":1,"url":"test_url","comment":"test_comment","owner":{"id":1,"userName":"unit_test","email":"unit_test@gmail.com","gender":"male"}}]) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'saveInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'deleteInfo',
        message: 'What is your delete function name? (Ex. deletePhotoInfo) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'deleteInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'otherTableSaveInfo',
        message:
          'What is your save info for other table? - Optional (Ex. comments:array-saveCommentInfo-[{"id":1,"comment":"c_1","owner":{"id":1},"photo":{"id":1}},{"id":2,"comment":"c_2","owner":{"id":1},"photo":{"id":2}}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherTableDeleteInfo',
        message:
          'What is your delete info for other table? - Optional (Ex. deleteCommentInfo-[{"id":1},{"id":2}], etc...) -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateE2EQueryOne(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate E2E code - add.', {
    description: 'This is a command for generating e2e code add.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. addPhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'graphqlInfo',
        message:
          'What is your graphql info? (Ex. CreatePhotoDto->{"url":"test_url","comment":"test_comment"}->id,url,comment,owner-id;userName;email;gender,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'output is required.';
        },
      },
      {
        type: 'input',
        name: 'apiResult',
        message:
          'What is your api result? (Ex. {"url":"test_url","comment":"test_comment","owner": {"id":1,"userName":"unit_test","email":"unit_test@gmail.com","gender":"male"}},etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiResult is required.';
        },
      },
      {
        type: 'input',
        name: 'deleteInfo',
        message: 'What is your delete function name? (Ex. deletePhotoInfo) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'deleteInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'otherTableSaveInfo',
        message:
          'What is your save info for other table? - Optional (Ex. comments:array-saveCommentInfo-[{"id":1,"comment":"c_1","owner":{"id":1},"photo":{"id":1}},{"id":2,"comment":"c_2","owner":{"id":1},"photo":{"id":2}}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherTableDeleteInfo',
        message:
          'What is your delete info for other table? - Optional (Ex. deleteCommentInfo-[{"id":1},{"id":2}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'validateStringInfo',
        message:
          'What is your validation parameters for string? - Optional (Ex. comment;{"params": {"comment":1,url:"valid_url"}}<->url;{"params":{"comment":"valid_comment","url":1}}, etc...) -> ',
      },
      {
        type: 'input',
        name: 'validateIntInfo',
        message: 'What is your validation parameters for int? - Optional (Ex. id;{"id":"abc"}, etc...) -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateE2EAdd(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate E2E code - update.', {
    description: 'This is a command for generating e2e code update.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. updatePhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'graphqlInfo',
        message:
          'What is your graphql info? (Ex. id:1->UpdatePhotoDto->{"url":"test_url","comment":"test_comment"}->id,url,comment,owner-id;userName;email;gender,etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'output is required.';
        },
      },
      {
        type: 'input',
        name: 'apiResult',
        message:
          'What is your api result? (Ex. {"url":"test_url","comment":"test_comment","owner": {"id":1,"userName":"unit_test","email":"unit_test@gmail.com","gender":"male"}},etc...) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiResult is required.';
        },
      },
      {
        type: 'input',
        name: 'saveInfo',
        message:
          'What is your save info for preparing data? (Ex. savePhotoInfo-[{"id":1,"url":"test_url","comment":"test_comment","owner":{"id":1,"userName":"unit_test","email":"unit_test@gmail.com","gender":"male"}}]) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'saveInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'deleteInfo',
        message: 'What is your delete function name? (Ex. deletePhotoInfo) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'deleteInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'otherTableSaveInfo',
        message:
          'What is your save info for other table? - Optional (Ex. comments:array-saveCommentInfo-[{"id":1,"comment":"c_1","owner":{"id":1},"photo":{"id":1}},{"id":2,"comment":"c_2","owner":{"id":1},"photo":{"id":2}}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherTableDeleteInfo',
        message:
          'What is your delete info for other table? - Optional (Ex. deleteCommentInfo-[{"id":1},{"id":2}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'validateStringInfo',
        message:
          'What is your validation parameters for string? - Optional (Ex. comment;{"id":1, "params":{"comment":1}}, etc...) -> ',
      },
      {
        type: 'input',
        name: 'validateIntInfo',
        message:
          'What is your validation parameters for int? - Optional (Ex. id;{"id":"abc","params":{"comment":"valid_comment"}}, etc...) -> ',
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateE2EUpdate(answers);
      },
    ],
  });

  plop.setGenerator('VFA generate E2E code - delete.', {
    description: 'This is a command for generating e2e code delete.',
    prompts: [
      {
        type: 'input',
        name: 'devName',
        message: 'What is your name? -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'devName is required.';
        },
      },
      {
        type: 'input',
        name: 'folderName',
        message: 'What is your folder name (Generated folder - Ex. photos)?  -> ',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'folderName is required.';
        },
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is your Api name? (Ex. deletePhoto) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'apiName is required.';
        },
      },
      {
        type: 'input',
        name: 'saveInfo',
        message:
          'What is your save info for preparing data? (Ex. savePhotoInfo-[{"id":1,"url":"test_url","comment":"test_comment","owner": {"id":1,"userName":"unit_test","email":"unit_test@gmail.com","gender":"male"}}]) -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'saveInfo is required.';
        },
      },
      {
        type: 'input',
        name: 'otherTableSaveInfo',
        message:
          'What is your save info for other table? - Optional (Ex. comments:array-saveCommentInfo-[{"id":1,"comment":"c_1","owner":{"id":1},"photo":{"id":1}},{"id":2,"comment":"c_2","owner":{"id":1},"photo":{"id":2}}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'otherTableDeleteInfo',
        message:
          'What is your delete info for other table? - Optional (Ex. deleteCommentInfo-[{"id":1},{"id":2}], etc...) -> ',
      },
      {
        type: 'input',
        name: 'findInfo',
        message: 'What is your find function name? (Ex. findOnePhoto-[{"id":1},{"id":2}],etc... -> ',
        validate: function (value) {
          if (/.+/.test(value)) return true;
          return 'findInfo is required.';
        },
      },
    ],
    actions: [
      async function customAction(answers) {
        await generateE2EDelete(answers);
      },
    ],
  });
};
