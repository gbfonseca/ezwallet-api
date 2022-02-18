import { UserModel } from './user';
import { VariableIncomeModel } from './variable_income';

export interface WalletModel {
  id: string;
  name: string;
  primary: boolean;
  user?: UserModel;
  created_at?: Date;
  updated_at?: Date;
  variable_income: VariableIncomeModel;
}
