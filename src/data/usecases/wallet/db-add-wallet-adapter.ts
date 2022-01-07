import { UserModel } from '../../../domain/models/user';
import { WalletModel } from '../../../domain/models/wallet';
import {
  AddWallet,
  AddWalletModel,
} from '../../../domain/usecases/wallet/add-wallet';

export class DbAddWalletAdapter implements AddWallet {
  async add(addWallet: AddWalletModel, user: UserModel): Promise<WalletModel> {
    return new Promise((resolve) => resolve(null));
  }
}
