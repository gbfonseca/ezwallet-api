import { AccountModel, AddAccountModel } from '../models/account';

export interface AddAccount {
  add(addAccount: AddAccountModel): AccountModel;
}
