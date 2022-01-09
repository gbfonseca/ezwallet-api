import request from 'supertest';
import { fakeUser } from '../../../tests/factories/fake-user';
import { TypeormHelper } from '../../infra/db/typeorm/helpers/typeorm-helper';
import app from '../config/app';
import setupMiddlewares from '../config/middlewares';
import setupRoutes from '../config/routes';
describe('SignUp Route', () => {
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

  afterAll(() => {
    TypeormHelper.client.close();
  });

  beforeEach(async () => {
    await TypeormHelper.clear();
  });

  test('should SignUpRoute returns an account', async () => {
    await request(app).post('/api/auth/signup').send(fakeUser).expect(200);
  });
});
