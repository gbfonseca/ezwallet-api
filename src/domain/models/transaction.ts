import { ProductModel } from './product';

export interface TransactionModel {
  id: string;
  name: string;
  quantity: number;
  price: number;
  purchase_date: Date;
  fees?: number;
  type: string;
}

export enum TransactionTypeEnum {
  PURCHASE = 'purchase',
  SALE = 'sale',
}
