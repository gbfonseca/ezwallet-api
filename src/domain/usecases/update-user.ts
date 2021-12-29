import { UserModel } from '../models/user';

export interface UpdateUserModel {
  name: string;
  lastName: string;
  email: string;
}

export interface UpdateUser {
  update(user: UserModel, data: UpdateUserModel): Promise<UserModel>;
}
