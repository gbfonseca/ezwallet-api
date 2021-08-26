import { UserModel } from '../models/user';
export interface AddUserModel {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface AddUser {
  add(addUser: AddUserModel): Promise<UserModel>;
}
