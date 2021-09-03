import { UserModel } from '../models/user';

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  user: UserModel;
  token: string;
}

export interface Authentication {
  checkCredentials(credentials: Credentials): Promise<AuthenticatedUser>;
}
