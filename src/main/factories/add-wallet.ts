import { CreateWalletController } from '../../presentation/controllers/wallet/create-wallet/create-wallet';
import { DbAddWalletAdapter } from '../../data/usecases/wallet/db-add-wallet-adapter/db-add-wallet-adapter';
import { WalletTypeormRepository } from '../../infra/db/typeorm/repositories/wallet/wallet';
import { getCustomRepository } from 'typeorm';
export const makeAddWallet = (): CreateWalletController => {
  const addWalletRepository = getCustomRepository(WalletTypeormRepository);
  const dbAddWalletAdapter = new DbAddWalletAdapter(addWalletRepository);
  const createWalletController = new CreateWalletController(dbAddWalletAdapter);

  return createWalletController;
};
