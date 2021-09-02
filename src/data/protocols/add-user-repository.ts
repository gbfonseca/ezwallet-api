import {
  UserModel,
  AddUserModel,
} from '../usecases/user/db-add-user-adapter-protocols';

export interface AddUserRepository {
  add(addUser: AddUserModel): Promise<UserModel>;
}
