import { PostgresHelper } from '../../helpers/postgres-helper';
import { AccountPostgresRepository } from './account';

describe('AccountPostgresRepository', () => {
  const makeSut = (): AccountPostgresRepository => {
    return new AccountPostgresRepository();
  };

  beforeAll(async () => {
    await PostgresHelper.connect({
      type: 'sqlite',
      database: 'test.sql',
      entities: ['src/infra/db/typeorm/entities/**.ts'],
      migrations: ['src/infra/db/typeorm/migrations/**.ts'],
      migrationsRun: true,
      synchronize: true,
      cli: {
        migrationsDir: './src/infra/db/typeorm/migrations',
      },
    });
  });

  afterAll(() => {
    PostgresHelper.client.close();
  });

  beforeEach(async () => {
    await PostgresHelper.clear();
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
