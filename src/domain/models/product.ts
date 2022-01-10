import { WalletModel } from './wallet';

export interface ProductModel {
  id: string;
  name: string;
  quantity: number;
  price: number;
  purchase_date: Date;
  fees?: number;
  wallet: WalletModel;
}
