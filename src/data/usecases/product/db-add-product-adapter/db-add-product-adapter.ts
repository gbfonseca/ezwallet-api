import { ProductModel } from '../../../../domain/models/product';
import {
  AddProduct,
  AddProductModel,
} from '../../../../domain/usecases/product/add-product';

export class DbAddProductAdapter implements AddProduct {
  async add(
    walletId: string,
    addProduct: AddProductModel,
  ): Promise<ProductModel> {
    return new Promise((resolve) => resolve(null));
  }
}
