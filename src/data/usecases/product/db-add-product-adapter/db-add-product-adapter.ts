import { ProductModel } from '../../../../domain/models/product';
import {
  AddProduct,
  AddProductModel,
} from '../../../../domain/usecases/product/add-product';
import { FindWalletByIdRepository } from '../../../protocols/find-wallet-by-id-repository';

export class DbAddProductAdapter implements AddProduct {
  constructor(
    private readonly findWalletByIdRepository: FindWalletByIdRepository,
  ) {}
  async add(
    walletId: string,
    addProduct: AddProductModel,
  ): Promise<ProductModel> {
    await this.findWalletByIdRepository.findById(walletId);
    return new Promise((resolve) => resolve(null));
  }
}
