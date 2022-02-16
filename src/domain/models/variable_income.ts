import { WalletModel } from './wallet';

export interface VariableIncomeModel {
  id: string;
  name: string;
  invested_value: number;
  current_value: number;
  percentage_yield: number;
  wallet: WalletModel;
}
