import { TypeormHelper } from '../../helpers/typeorm-helper';
import { UserTypeormRepository } from './user';

describe('userTypeormRepository', () => {
  const makeSut = (): UserTypeormRepository => {
    return new UserTypeormRepository();
  };

  beforeAll(async () => {
    await TypeormHelper.connect({
      type: 'sqlite',
      database: 'test.sql',
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
    await TypeormHelper.client.query('DELETE FROM USER');
  });

  test('should return an user if success', async () => {
    const sut = makeSut();

    const user = await sut.add({
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(user.name).toBe('any_name');
    expect(user.lastName).toBe('any_lastName');
    expect(user.email).toBe('any_email@mail.com');
    expect(user.password).toBe('any_password');
  });
});
