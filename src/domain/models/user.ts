export interface UserModel {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}
