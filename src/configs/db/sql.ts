import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// database env config
let entityCf = 'src/**/*.entity{.ts,.js}';
if (process.env.APP_ENV !== 'LOCAL') {
    entityCf = 'dist/**/*.entity{.ts,.js}';
}
const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // synchronize: true,
    entities: [entityCf]
};

export default dbConfig;