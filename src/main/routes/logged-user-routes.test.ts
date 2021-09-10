import { TypeormHelper } from './../../infra/db/typeorm/helpers/typeorm-helper';
import request from 'supertest';
import app from '../config/app';

const fakeUser = {
  name: 'Gabriel',
  lastName: 'Fonseca',
  email: 'userx@mail.com',
  password: '123123',
  confirmPassword: '123123',
};

describe('LoggedUser route', () => {
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

  afterAll(async () => {
    await TypeormHelper.client.close();
  });

  beforeEach(async () => {
    await TypeormHelper.clear();
  });
  test('should return an user', async () => {
    await request(app).post('/api/auth/signup').send(fakeUser).expect(200);

    const { body } = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'userx@mail.com',
        password: '123123',
      })
      .expect(200);

    await request(app)
      .get('/api/auth/logged-user')
      .set('Authorization', `Bearer ${body.token}`)
      .expect(200);
  });
});
