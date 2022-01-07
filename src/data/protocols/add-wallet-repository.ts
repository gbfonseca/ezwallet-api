import { UserModel } from '../../domain/models/user';
import { WalletModel } from '../../domain/models/wallet';
import { AddWalletModel } from '../../domain/usecases/wallet/add-wallet';

export interface AddWalletRepository {
  add(addWallet: AddWalletModel, user: UserModel): Promise<WalletModel>;
}
