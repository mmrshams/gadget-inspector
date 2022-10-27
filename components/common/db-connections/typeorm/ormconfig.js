const SnakeNamingStrategy =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_APP_USER || 'migrator',
  password: process.env.DB_APP_PASS || 'migrator',
  database: process.env.DB_NAME || 'test_gadjet',
  logging: true,
  schema: process.env.DB_SCHEMA || 'test',
  namingStrategy: new SnakeNamingStrategy(),
};
