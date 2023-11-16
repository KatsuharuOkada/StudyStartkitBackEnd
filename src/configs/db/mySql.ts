import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
require('dotenv').config({ debug: process.env.APP_DEBUG });
const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: Number(process.env.RDS_PORT) || 3306,
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  logger: 'debug',
  charset: 'utf8mb4',
  synchronize: true,
  entities: [path.join(__dirname, '../..', '/**/*.entity{.ts,.js}')],
};
export default dbConfig;
