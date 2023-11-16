# GraphQL Template

![image](./docs/hello.png)

## Getting started

This is an example assignment while applying to development at VFA.

## Table of contents:

- [Pre-requirement](#pre-requirement)
- [Installtion](#installation)
- [Install](./docs/INSTALL.md#Install)
- [Starting server](#starting-server)
- [Coding](#coding)
- [Testing](#testing)
- [Features](#Features)
- [Checklists](#checklists)
- [Structure](#features)

# Pre-requirements

To build and run this app locally you will need a few things:

- Install [Docker](https://www.docker.com/). Required version Docker engine >= `17.09.0+`. We used some features of docker-compose version `v3.4`

- Install [VS Code](https://code.visualstudio.com/)

# Installation

- Clone the repository

```
git clone --depth=1 <link-repo> <project_name>
```

- Install dependencies

```
$ cd <project_name>
$ yarn
```

- Adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc). If you run application in docker, ENV in docker will got from here.

```bash

export NODE_ENV="local"
export DB_HOST="0.0.0.0"
export RDS_ROOT_PASSWORD="admin@123"
export RDS_DATABASE="db_template"
export RDS_USERNAME="devUser"
export RDS_PASSWORD="123456"

```

- Create file `.env` in your project's directory root. Your Nodejs Application will get ENV from this file.
  After that. change content in this file with value coresponding above step.

```bash
$ cp .env.example .env
```

# Starting server

## Docker environment production.

- Run your application in mode develop

```bash
$ yarn run start-docker
```

- Check from your browser. Default port is 3000

```sh
http://localhost:3000/graphql
```

## Running in mode development

**Keeping your Hot Code Reloading**

- A better way to develop this source with docker. When you run project in this mode, any file in directory `src/*` change. waiting a few seconds, Server nodejs will be restart.

```bash
$ yarn run start-docker:dev
```

## Commands

- `yarn run start:dev` Start server in development mode.
- `yarn run gen-query-graphq` Generate all queries for test purpose. After run this command. all queries statement will placed in `__tests__/gqlGenerated`
-

## Coding

Small example about module category, both test e2e and unit test. Please have a look. [Example](./docs/Example.md).

## Testing

- **This repository use [Jest](https://jestjs.io/docs/en/getting-started.html)**.

For run test case unit test.

```bash
$ yarn run test
```

- For run test case e2e test. Make sure that server had started before.

```bash
$ yarn run test:e2e
```

## Features

1. MVC architecture
2. GraphQL API
3. E2E testing
4. AWS Intergration
5. Background processing task
6. Multi database.
7. Typescript
8. Nodejs with Nestjs Framework

## Checklists

- [x] Building the base project by MVC architecture.
- [x] GraphQL API support
- [x] Authorization by API key
- [x] Authentication by access key
- [x] E2E testing for GraphQL
- [x] Logging in file
- [x] Auto check syntax and convention rules
- [x] Implementing automated build, test and deploy to CircleCI
- [x] Validate payload use library [JOI](https://github.com/hapijs/joi). You can read more [how to apply
      into NestJs](https://docs.nestjs.com/pipes#binding-pipes)

## Structure

1. Project configuration

```
.dockerignore             - docker ignore files
.lintstagerc              - tslint check config
.prettierignore           - prettier ignore files
.prettierrc               - prettier config
DockerFile                - Dockerfile
tsconfig.json             - typescript transpilation rule
tslint.json               - typescript lint rule
```

### Structure of a module GraphQL:

- `app/graphql/modules/*.module.ts` Define name module.
- `app/graphql/modules/*.resolver.ts` Handle process of API.
- `app/graphql/modules/*.graphql` Define schema Graphql.
- `app/graphql/dto/*.ts` Define validation of input.
- `app/graphql/general.graphql` General type of Graphql. For example `type DateTime`, ...
- `app/graphql/graphql.schema.ts` (DO NOT EDIT THIS FILE) This is file will be generated auto when you run command `yarn run generate-typings`. This file will help you more easy when working with typescript.

### Entities:

- **src/app/entities/\*.ts**
  - Declare all ORM. Currently, We use TypeORM to declare. Read more detail at [TypeORM](https://typeorm.io/#/).
