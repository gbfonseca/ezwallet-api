import { UserModel } from '../models/user';

export interface UpdateUserModel {
  name: string;
  lastName: string;
  email: string;
}

export interface UpdateUser {
  update(id: string, data: UpdateUserModel): Promise<UserModel>;
}
