import * as dotenv from 'dotenv';
dotenv.config();
export default {
  port: process.env.PORT,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [process.env.DB_ENTITIES],
    migrations: [process.env.DB_MIGRATIONS],
    synchronize: true,
    cli: {
      migrationsDir: '../../../infra/db/typeorm/migrations/',
      entitiesDir: '../../../infra/db/typeorm/entities/',
    },
  },
};
