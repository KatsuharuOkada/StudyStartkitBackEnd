const generateQueryOne = require('./tools/generate-query-one'),
  generateQueryList = require('./tools/generate-query-list'),
  generateAdd = require('./tools/generate-add'),
  generateUpdate = require('./tools/generate-update'),
  generateDelete = require('./tools/generate-delete');

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
        message: 'What is your folder name (Generated folder - Ex. photos - Ex. photos)?  -> ',
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
        name: 'importAlias',
        message:
          'What is your alias for entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
      },
      {
        type: 'input',
        name: 'joinTable',
        message:
          'What is joinTable and condition join if no please ignore it. (Join split by comma. others split by semi-colon) (Ex. innerJoin;owner;userAlias,leftJoin;comments;commentAlias,etc...) -> ',
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
        name: 'importAlias',
        message:
          'What is your alias for entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
      },
      {
        type: 'input',
        name: 'joinTable',
        message:
          'What is joinTable and condition join if no please ignore it. (Join split by comma. others split by semi-colon) (Ex. innerJoin;owner;userAlias,leftJoin;comments;commentAlias,etc...) -> ',
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
        name: 'importAlias',
        message:
          'What is your alias for entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentsAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
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
        name: 'importAlias',
        message:
          'What is your alias for entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
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
        name: 'importAlias',
        message:
          'What is your alias for entity? - Optional (alias split by comma. Name and path split by semi-colon) (Ex. userAlias;UsersEntity;../../entities/users.entity,commentAlias;CommentsEntity;../../entities/comments.entity,etc...) -> ',
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
};
