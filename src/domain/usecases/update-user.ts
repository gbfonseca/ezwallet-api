import { UserModel } from '../models/user';

export interface UpdateUserModel {
  name: string;
  lastName: string;
  email: string;
}

export interface UpdateUser {
  update(data: UpdateUserModel): Promise<UserModel>;
}
