import { Encrypter } from './../../protocols/encrypter';
import { AccountModel } from '../../../domain/models/account';
import { AddAccountModel } from '../../../domain/usecases/add-account';
import { AddAccount } from './db-add-account-adapter.protocols';

export class DbAccountAdapter implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(addAccount: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(addAccount.password);
    const account = Object.assign({}, addAccount, {
      id: 'valid_id',
      password: hashedPassword,
    });
    return account;
  }
}
