import { AccountModel } from '../models/account';
export interface AddAccountModel {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface AddAccount {
  add(addAccount: AddAccountModel): Promise<AccountModel>;
}
