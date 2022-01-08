import { FindWalletController } from '../../presentation/controllers/wallet/find-wallet/find-wallet';
import { DbFindWalletsByUserIdAdapter } from '../../data/usecases/wallet/db-find-wallets-by-user-id-adapter/db-find-wallets-by-user-id-adapter';
import { WalletTypeormRepository } from '../../infra/db/typeorm/repositories/wallet/wallet';
import { getCustomRepository } from 'typeorm';
export const makeFindWalletsByUserIdAdapter = (): FindWalletController => {
  const addWalletRepository = getCustomRepository(WalletTypeormRepository);
  const dbFindWalletsByUserIdAdapter = new DbFindWalletsByUserIdAdapter(
    addWalletRepository,
  );
  const findWalletController = new FindWalletController(
    dbFindWalletsByUserIdAdapter,
  );

  return findWalletController;
};
