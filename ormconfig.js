module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  allowJs: true,
  username: 'devUser',
  password: '123456',
  database: 'db_template',
  synchronize: false,
  logging: false,
  entities: ['src/app/entities/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};
