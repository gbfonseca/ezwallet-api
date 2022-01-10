import { ProductModel } from '../../models/product';

export interface AddProductModel {
  name: string;
  quantity: number;
  price: number;
  purchase_date: Date;
  fees?: number;
}

export interface AddProduct {
  add(walletId: string, addProduct: AddProductModel): Promise<ProductModel>;
}
