import { UpdateUserModel } from './../../domain/usecases/update-user';
import { UserModel } from '../usecases/user/db-add-user-adapter/db-add-user-adapter-protocols';

export interface UpdateUserRepository {
  updateUser(user: UserModel, updateUser: UpdateUserModel): Promise<UserModel>;
}
