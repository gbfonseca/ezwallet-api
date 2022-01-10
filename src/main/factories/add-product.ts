import { AddProductController } from '../../presentation/controllers/product/add-product/add-product';
import { DbAddProductAdapter } from '../../data/usecases/product/db-add-product-adapter/db-add-product-adapter';
import { ProductTypeormRepository } from '../../infra/db/typeorm/repositories/product/product';
import { WalletTypeormRepository } from '../../infra/db/typeorm/repositories/wallet/wallet';
import { getCustomRepository } from 'typeorm';
export const makeAddProduct = (): AddProductController => {
  const findWalletByIdRepository = getCustomRepository(WalletTypeormRepository);
  const addProductRepository = getCustomRepository(ProductTypeormRepository);
  const dbAddProductAdapter = new DbAddProductAdapter(
    findWalletByIdRepository,
    addProductRepository,
  );
  const addProductController = new AddProductController(dbAddProductAdapter);

  return addProductController;
};
