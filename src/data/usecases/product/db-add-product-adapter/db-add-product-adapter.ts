import { ProductModel } from '../../../../domain/models/product';
import {
  AddProduct,
  AddProductModel,
} from '../../../../domain/usecases/product/add-product';
import { AddProductRepository } from '../../../protocols/add-product-repository';
import { FindWalletByIdRepository } from '../../../protocols/find-wallet-by-id-repository';

export class DbAddProductAdapter implements AddProduct {
  constructor(
    private readonly findWalletByIdRepository: FindWalletByIdRepository,
    private readonly addProductRepository: AddProductRepository,
  ) {}
  async add(
    walletId: string,
    addProduct: AddProductModel,
  ): Promise<ProductModel> {
    const wallet = await this.findWalletByIdRepository.findById(walletId);

    await this.addProductRepository.add({
      ...addProduct,
      wallet,
    });

    return new Promise((resolve) => resolve(null));
  }
}
