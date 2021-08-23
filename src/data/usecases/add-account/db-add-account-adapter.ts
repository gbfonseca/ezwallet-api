import {
  Encrypter,
  AddAccountRepository,
  AccountModel,
  AddAccount,
  AddAccountModel,
} from './db-add-account-adapter.protocols';

export class DbAccountAdapter implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(addAccount: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(addAccount.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, addAccount, { password: hashedPassword }),
    );
    return account;
  }
}
