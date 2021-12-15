import {
  Encrypter,
  AddUserRepository,
  UserModel,
  AddUser,
  AddUserModel,
} from './db-add-user-adapter-protocols';

export class DbAddUserAdapter implements AddUser {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addUserRepository: AddUserRepository,
  ) {}

  async add(addUser: AddUserModel): Promise<UserModel> {
    const hashedPassword = await this.encrypter.encrypt(addUser.password);
    const user = await this.addUserRepository.add(
      Object.assign({}, addUser, { password: hashedPassword }),
    );
    return user;
  }
}
