import { TypeormHelper } from '../../helpers/typeorm-helper';
import { UserTypeormRepository } from './user';
import * as dotenv from 'dotenv';
import { getCustomRepository } from 'typeorm';
dotenv.config();
describe('userTypeormRepository', () => {
  const makeSut = (): UserTypeormRepository => {
    return getCustomRepository(UserTypeormRepository);
  };

  beforeAll(async () => {
    await TypeormHelper.connect({
      type: 'sqlite',
      database: ':memory:',
      entities: [process.env.DB_ENTITIES],
      migrations: [process.env.DB_MIGRATIONS],
      migrationsRun: true,
      cli: {
        migrationsDir: process.env.DB_ENTITIES_DIR,
        entitiesDir: process.env.DB_MIGRATIONS_DIR,
      },
    });
  });

  afterAll(() => {
    TypeormHelper.client.close();
  });

  beforeEach(async () => {
    await TypeormHelper.client.query('DELETE FROM USER');
  });

  test('should return an user if create success', async () => {
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
  });

  test('should return user if email of any user exists', async () => {
    const sut = makeSut();

    await sut.add({
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const user = await sut.findByEmail('any_email@mail.com');

    expect(user).toBeTruthy();
    expect(user.email).toBe('any_email@mail.com');
  });

  test('should return an UpdateUser on success', async () => {
    const sut = makeSut();

    const user = {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
    };

    const userUpdated = await sut.updateUser(user, {
      name: 'new_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
    });

    expect(userUpdated).toBeTruthy();
    expect(userUpdated.name).toBe('new_name');
  });
});
