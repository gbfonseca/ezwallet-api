import { EntityRepository, getRepository, Repository } from 'typeorm';
import { AddProductRepository } from '../../../../../data/protocols/add-product-repository';
import { ProductModel } from '../../../../../domain/models/product';
import { AddProductModel } from '../../../../../domain/usecases/product/add-product';
import { VariableIncomeModel } from '../../../../../domain/models/variable_income';
import { Product } from '../../entities/product.entity';
import { Transaction } from '../../entities/transaction.entity';

@EntityRepository(Product)
export class ProductTypeormRepository
  extends Repository<Product>
  implements AddProductRepository
{
  async add(
    addProduct: AddProductModel,
    variable_income: VariableIncomeModel,
  ): Promise<ProductModel> {
    const { name, price, purchase_date, quantity, fees } = addProduct;

    const hasProductOnVariableIncome = variable_income.products.find(
      (product) => product.name === name,
    );
    if (hasProductOnVariableIncome) {
      const product = await this.findOne({
        where: {
          name: addProduct.name,
        },
      });

      const transactionRepository = getRepository(Transaction);

      const transaction = transactionRepository.create(addProduct);
      await transactionRepository.save(transaction);

      product.transactions.push(transaction);
      await this.save(product);
      return product;
    }

    const product = this.create({
      name,
      variable_income,
      transactions: [addProduct],
    });

    await this.save(product);

    return product;
  }
}
