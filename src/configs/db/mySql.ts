import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// tslint:disable-next-line
require('dotenv').config();

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ['./**/**/**.entity{.ts,.js}']
};

export default dbConfig;
