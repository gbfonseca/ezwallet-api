import request from 'supertest';
import { TypeormHelper } from '../../infra/db/typeorm/helpers/typeorm-helper';
import app from '../config/app';

describe('SignUp Route', () => {
  beforeAll(async () => {
    await TypeormHelper.connect({
      type: 'sqlite',
      database: ':memory:',
      entities: ['src/infra/db/typeorm/entities/**.ts'],
      migrations: ['src/infra/db/typeorm/migrations/**.ts'],
      migrationsRun: true,
      cli: {
        migrationsDir: './src/infra/db/typeorm/migrations',
        entitiesDir: './src/infra/db/typeorm/entities',
      },
    });
  });

  afterAll(() => {
    TypeormHelper.client.close();
  });

  beforeEach(async () => {
    await TypeormHelper.clear();
  });

  test('should SignUpRoute returns an account', async () => {
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
  });
});
