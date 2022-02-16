import { getCustomRepository } from 'typeorm';
import { WalletModel } from '../../../../../domain/models/wallet';
import { TypeormHelper } from '../../helpers/typeorm-helper';
import { ProductTypeormRepository } from './product';
import { createFakeWallet } from '../../../../../../tests/factories/create-wallet';

import * as dotenv from 'dotenv';
dotenv.config();

const makeSut = (): ProductTypeormRepository => {
  return getCustomRepository(ProductTypeormRepository);
};

describe('ProductTypeorm Repository', () => {
  let wallet: WalletModel;
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
    await TypeormHelper.client.query('PRAGMA foreign_keys=OFF');

    wallet = await createFakeWallet();
  });

  afterAll(() => {
    TypeormHelper?.client?.close();
  });

  beforeEach(async () => {
    await TypeormHelper.client.query('DELETE FROM WALLET');
    await TypeormHelper.client.query('DELETE FROM USER');
    await TypeormHelper.client.query("DELETE FROM 'TRANSACTION'");
    await TypeormHelper.client.query('DELETE FROM PRODUCT');
    await TypeormHelper.client.query('DELETE FROM VARIABLEINCOME');

    await TypeormHelper.clear();
  });

  it('should return a product on success', async () => {
    const sut = makeSut();

    const product = {
      name: 'BBAS3.SA',
      quantity: 10,
      price: 29.8,
      purchase_date: new Date('2021-08-21'),
      fees: 0.51,
      type: 'purchase',
    };

    const response = await sut.add(product, wallet.variable_income);

    expect(response.id).toBeTruthy();
  });
});
