import { EntityRepository, Repository } from 'typeorm';
import { AddProductRepository } from '../../../../../data/protocols/add-product-repository';
import { ProductModel } from '../../../../../domain/models/product';
import { AddProductModel } from '../../../../../domain/usecases/product/add-product';
import { VariableIncomeModel } from '../../../../../domain/usecases/wallet/variable_income';
import { Product } from '../../entities/product.entity';

@EntityRepository(Product)
export class ProductTypeormRepository
  extends Repository<Product>
  implements AddProductRepository
{
  async add(
    addProduct: AddProductModel,
    variable_income: VariableIncomeModel,
  ): Promise<ProductModel> {
    const { name, purchase_date, price, quantity, fees } = addProduct;
    const product = this.create();
    product.name = name;
    product.price = price;
    product.purchase_date = purchase_date;
    product.quantity = quantity;
    product.fees = fees;
    product.variable_income = variable_income;

    await this.save(product);

    return product;
  }
}
