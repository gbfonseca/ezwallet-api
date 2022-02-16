import { getCustomRepository } from 'typeorm';
import { WalletTypeormRepository } from '../../src/infra/db/typeorm/repositories/wallet/wallet';
import { createFakeUser } from './create-fake-user';

export const createFakeWallet = async () => {
  const repo = getCustomRepository(WalletTypeormRepository);
  await repo.delete({});
  const user = await createFakeUser();
  const wallet = await repo.add(
    {
      name: 'any wallet',
    },
    user,
  );
  return wallet;
};
