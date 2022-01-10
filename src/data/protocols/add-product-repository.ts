import { ProductModel } from '../../domain/models/product';
import { WalletModel } from '../../domain/models/wallet';
import { AddProductModel } from '../../domain/usecases/product/add-product';

export type AddProductRepositoryData = AddProductModel & {
  wallet: WalletModel;
};

export interface AddProductRepository {
  add(addProduct: AddProductRepositoryData): Promise<ProductModel>;
}
