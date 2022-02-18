import { GetPrimaryWalletController } from '../../presentation/controllers/wallet/get-primary-wallet/get-primary-wallet';
import { DbGetPrimaryWalletAdapter } from '../../data/usecases/wallet/db-get-primary-wallet-adapter/db-get-primary-wallet-adapter';
import { WalletTypeormRepository } from '../../infra/db/typeorm/repositories/wallet/wallet';
import { getCustomRepository } from 'typeorm';
export const makeGetPrimaryWallet = (): GetPrimaryWalletController => {
  const walletTypeormRepository = getCustomRepository(WalletTypeormRepository);
  const dbGetPrimaryWallet = new DbGetPrimaryWalletAdapter(
    walletTypeormRepository,
  );
  const getPrimaryWalletController = new GetPrimaryWalletController(
    dbGetPrimaryWallet,
  );

  return getPrimaryWalletController;
};
