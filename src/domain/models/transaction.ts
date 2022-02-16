export interface TransactionModel {
  id: string;
  name: string;
  quantity: number;
  price: number;
  purchase_date: Date;
  fees?: number;
  type: TransactionTypeEnum;
}

export enum TransactionTypeEnum {
  PURCHASE = 'purchase',
  SALE = 'sale',
}
