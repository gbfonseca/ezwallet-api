import { UserModel } from '../../models/user';
import { WalletModel } from '../../models/wallet';

export interface AddWalletModel {
  name: string;
}
export interface AddWallet {
  add(addWallet: AddWalletModel, user: UserModel): Promise<WalletModel>;
}
