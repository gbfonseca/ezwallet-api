import {
  AccountModel,
  AddAccountModel,
} from '../usecases/add-account/db-add-account-adapter.protocols';

export interface AddAccountRepository {
  add(addAccount: AddAccountModel): Promise<AccountModel>;
}
