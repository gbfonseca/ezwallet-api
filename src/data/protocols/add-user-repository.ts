import {
  UserModel,
  AddUserModel,
} from '../usecases/add-user/db-add-user-adapter-protocols';

export interface AddUserRepository {
  add(addUser: AddUserModel): Promise<UserModel>;
}
