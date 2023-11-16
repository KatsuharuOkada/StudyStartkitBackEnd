import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
require('dotenv').config();
const config = {
  type: 'mysql',
  port: process.env.RDS_PORT || 3306,
  keepConnectionAlive: true,
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: true,
  entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
} as TypeOrmModuleOptions;

export default config;
