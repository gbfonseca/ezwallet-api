import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config();
export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [join(__dirname, '..', '..', '..', process.env.DB_ENTITIES)],
    migrations: [join(__dirname, '..', '..', '..', process.env.DB_MIGRATIONS)],
    synchronize: true,
    cli: {
      migrationsDir: join(
        __dirname,
        '..',
        '..',
        '..',
        process.env.DB_ENTITIES_DIR,
      ),
      entitiesDir: join(
        __dirname,
        '..',
        '..',
        '..',
        process.env.DB_MIGRATIONS_DIR,
      ),
    },
  },
};
