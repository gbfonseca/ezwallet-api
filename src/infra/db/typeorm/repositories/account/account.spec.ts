import { TypeormHelper } from '../../helpers/typeorm-helper';
import { AccountTypeormRepository } from './account';

describe('AccountTypeormRepository', () => {
  const makeSut = (): AccountTypeormRepository => {
    return new AccountTypeormRepository();
  };

  beforeAll(async () => {
    await TypeormHelper.connect({
      type: 'sqlite',
      database: ':memory:',
      entities: ['src/infra/db/typeorm/entities/**.ts'],
      migrations: ['src/infra/db/typeorm/migrations/**.ts'],
      synchronize: true,
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

  test('should return an account if success', async () => {
    const sut = makeSut();

    const account = await sut.add({
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.lastName).toBe('any_lastName');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });
});
