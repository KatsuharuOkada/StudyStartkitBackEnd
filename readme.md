# Workshop Test With Jest Typescript
## Slide
- [Link slide](https://docs.google.com/presentation/d/1s5C0Xji-TVVMucqDaXL-U2OSMHPaOuvgmrYxGs8hyek/edit#slide=id.gc6f9e470d_0_0)

## Clone from Github

```sh
$ git clone git@github.com:vitalifyjp/Node_GraphQL_Backend_Template.git jest-demo
$ cd jest-demo
```
switch to node version >=13

## Install nvm
- https://github.com/nvm-sh/nvm

```sh
$ cd demo/unitTest
$ nvm use
```

### Demo unit test

1. Install packages 

```sh
$ cd demo/unitTest
$ yarn 
```

2. Run test

```sh
$ yarn run test
```

### Demo E2e test
1. Install packages 

```sh
$ cd demo/e2e
$ yarn 
```

2. Start mysql in docker

```sh
$ yarn run start-local-docker
```
3. Start project

```sh
yarn run start:dev
```

4. Run test e2e

```sh
$ yarn run test:e2e

```

### Gen query graphql

```sh
$ yarn run gen-query-graphql
```