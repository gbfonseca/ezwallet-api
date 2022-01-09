import { TypeormHelper } from '../../infra/db/typeorm/helpers/typeorm-helper';
import request from 'supertest';
import app from '../config/app';
import setupMiddlewares from '../config/middlewares';
import setupRoutes from '../config/routes';
describe('SignIn Route', () => {
  beforeAll(async () => {
    await TypeormHelper.connect({
      type: 'sqlite',
      database: ':memory:',
      entities: ['src/infra/db/typeorm/entities/**.ts'],
      migrations: ['src/infra/db/typeorm/migrations/**.ts'],
      synchronize: true,
      cli: {
        migrationsDir: './src/infra/db/typeorm/migrations',
        entitiesDir: './src/infra/db/typeorm/entities',
      },
    });
    setupMiddlewares(app);
    setupRoutes(app);
  });

  afterAll(async () => {
    await TypeormHelper.client.close();
  });

  beforeEach(async () => {
    await TypeormHelper.clear();
  });

  test('should SignIn Route returns an user and token', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Gabriel',
        lastName: 'Fonseca',
        email: 'userx@mail.com',
        password: '123123',
        confirmPassword: '123123',
      })
      .expect(200);

    await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'userx@mail.com',
        password: '123123',
      })
      .expect(200);
  });
});
