import { ProductModel } from '../../domain/models/product';
import { AddProductModel } from '../../domain/usecases/product/add-product';
import { VariableIncomeModel } from '../../domain/usecases/wallet/variable_income';

export interface AddProductRepository {
  add(
    addProduct: AddProductModel,
    variable_income: VariableIncomeModel,
  ): Promise<ProductModel>;
}
