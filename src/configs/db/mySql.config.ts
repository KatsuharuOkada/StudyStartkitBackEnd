import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default registerAs(
  'database',
  () =>
    ({
      type: 'mysql',
      port: Number(process.env.RDS_PORT) || 3306,
      host: process.env.RDS_HOST,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
      synchronize: true,
      logging: process.env.DB_LOGGING === 'true',
      entities: [join(__dirname, '../..', '/**/*.entity{.ts,.js}')],
    } as TypeOrmModuleOptions)
);
