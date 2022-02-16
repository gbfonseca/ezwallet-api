import { TransactionModel } from './transaction';
import { VariableIncomeModel } from './variable_income';
export interface ProductModel {
  id: string;
  name: string;
  quantity: number;
  total_price: number;
  average_price: number;
  transactions: TransactionModel[];
  variable_income: VariableIncomeModel;
}
