import { UserModel } from './user';

export interface WalletModel {
  id: string;
  name: string;
  user: UserModel;
  created_at?: Date;
  updated_at?: Date;
}
