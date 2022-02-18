import { TypeormHelper } from '../../helpers/typeorm-helper';
import { WalletTypeormRepository } from './wallet';
import * as dotenv from 'dotenv';
import { createFakeWallet } from '../../../../../../tests/factories/create-wallet';

dotenv.config();

const makeSut = () => {
  return TypeormHelper.client.getCustomRepository(WalletTypeormRepository);
};

describe('WalletTypeormRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect({
      type: 'sqlite',
      database: ':memory:',
      entities: [process.env.DB_ENTITIES],
      migrations: [process.env.DB_MIGRATIONS],
      synchronize: true,
      cli: {
        migrationsDir: process.env.DB_ENTITIES_DIR,
        entitiesDir: process.env.DB_MIGRATIONS_DIR,
      },
    });
  });

  afterAll(async () => {
    TypeormHelper.client.close();
  });

  beforeEach(async () => {
    await TypeormHelper.client.query('DELETE FROM WALLET');
    await TypeormHelper.client.query('DELETE FROM USER');
    await TypeormHelper.client.query(
      "INSERT INTO USER (id, name, lastName, email, password) VALUES ('any_id', 'any_name', 'any_lastName', 'any_email@mail.com', 'any_password' )",
    );
  });

  it('should return an wallet on success', async () => {
    const sut = makeSut();

    const addWallet = {
      name: 'Any Wallet Name',
    };

    const user = {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
    };

    const response = await sut.add(addWallet, user);

    expect(response).toBeTruthy();
    expect(response.id).toBeTruthy();
  });

  it('should return an wallets array on success', async () => {
    const sut = makeSut();

    const addWallet = {
      name: 'Any Wallet Name',
    };

    const user = {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_lastName',
      email: 'any_email@mail.com',
    };

    await sut.add(addWallet, user);

    const id = 'any_id';

    const response = await sut.findByUserId(id);

    expect(response.length).toBeGreaterThan(0);
  });

  it('should return an wallet by id on success', async () => {
    const sut = makeSut();

    const fakeWallet = await createFakeWallet();

    const response = await sut.findById(fakeWallet.id);

    expect(response.id).toBeTruthy();
  });

  it('should turn an wallet in primary', async () => {
    const sut = makeSut();

    const fakeWallet = await createFakeWallet();

    const response = await sut.setPrimary(fakeWallet.id);

    expect(response.primary).toBe(true);
  });

  it('should return the primary wallet', async () => {
    const sut = makeSut();

    const fakeWallet = await createFakeWallet();

    const response = await sut.getPrimary(fakeWallet.user.id);

    console.log(response);

    expect(response.primary).toBe(true);
  });
});
