# Node_Template

## Hello World

Node_Template_Project is an example assignment while applying to development at VFA.

We're applying some keys:

1. MVC architecture.
2. RESTful API
3. GraphQL API
4. E2E testing
5. AWS Intergration
6. Background processing task
7. Multi database
8. Typescript
9. Nodejs with Nestjs Framework

## Checklists

- [x] Building the base project by MVC architecture.
- [x] RESTful API support
- [x] GraphQL API support
- [x] Authorization by API key
- [ ] Authentication by access key
- [x] E2E testing for GraphQL
- [ ] E2E testing for RESTful
- [ ] Logging in file
- [x] Auto check syntax and convention rules
- [x] Implementing automated build, test and deploy to CircleCI, TravisCI,...

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start
# watch mode
$ yarn run start:dev
# production mode
$ yarn run start:prod
```

- GraphQL: Open browser and go to http://localhost:3001/api, you can check your API here.
- RESTful: API url start with http://localhost:3001/api/*

## Test

```bash
# unit tests
$ yarn run test
# e2e tests
$ yarn run test:e2e
# test coverage
$ yarn run test:cov
```

## Deploy your service

```bash
# Run command:
$ yarn start-docker


# Stop your service:
$ yarn stop-docker
```
