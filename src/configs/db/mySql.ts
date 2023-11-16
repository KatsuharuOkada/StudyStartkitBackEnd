import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// tslint:disable-next-line
require('dotenv').config();

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: Number(process.env.RDS_PORT),
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: true,
  entities: ['./**/**/**.entity{.ts,.js}']
};
export default dbConfig;
