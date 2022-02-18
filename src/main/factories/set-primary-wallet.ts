import { SetPrimaryWalletController } from '../../presentation/controllers/wallet/set-primary-wallet/set-primary-wallet';
import { DbSetPrimaryWalletAdapter } from '../../data/usecases/wallet/db-set-primary-wallet-adapter/db-set-primary-wallet';
import { WalletTypeormRepository } from '../../infra/db/typeorm/repositories/wallet/wallet';
import { getCustomRepository } from 'typeorm';
export const makeSetPrimaryWallet = (): SetPrimaryWalletController => {
  const walletTypeormRepository = getCustomRepository(WalletTypeormRepository);
  const dbSetPrimaryWalletAdapterr = new DbSetPrimaryWalletAdapter(
    walletTypeormRepository,
  );
  const addProductController = new SetPrimaryWalletController(
    dbSetPrimaryWalletAdapterr,
  );

  return addProductController;
};
