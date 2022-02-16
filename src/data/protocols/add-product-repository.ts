import { ProductModel } from '../../domain/models/product';
import { VariableIncomeModel } from '../../domain/models/variable_income';
import { WalletModel } from '../../domain/models/wallet';
import { AddProductModel } from '../../domain/usecases/product/add-product';

export interface AddProductRepository {
  add(
    addProduct: AddProductModel,
    variable_income: VariableIncomeModel,
  ): Promise<ProductModel>;
}
