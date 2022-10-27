const SnakeNamingStrategy =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_MIGRATOR_USER || 'migrator',
  password: process.env.DB_MIGRATOR_PASS || 'migrator',
  database: process.env.DB_NAME || 'test_gadjet',
  logging: true,
  schema: process.env.DB_SCHEMA || 'test',
  migrationsTableName: 'migrations',
  migrations: ['components/common/db-connections/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'components/common/db-connections/typeorm/migrations/',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
