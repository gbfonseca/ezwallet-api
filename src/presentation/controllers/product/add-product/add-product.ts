import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { badRequest, serverError, ok } from '../../../helpers/http-helper';
import { MissingParamError } from '../../../errors/missing-param-error';
import { InvalidParamError } from '../../../errors/invalid-param-error';
import { AddProduct } from '../../../../domain/usecases/product/add-product';

interface RequestBodyType {
  name: string;
  quantity: number;
  price: number;
  purchase_date: Date;
  fees?: number;
}

interface RequestParamsType {
  walletId: string;
}

export class AddProductController implements Controller {
  constructor(private readonly addProduct: AddProduct) {}

  async handle(
    httpRequest: HttpRequest<RequestBodyType, RequestParamsType>,
  ): Promise<HttpResponse<any>> {
    try {
      const requiredFields = ['name', 'quantity', 'price', 'purchase_date'];
      const { purchase_date } = httpRequest.body;
      const purchase_date_formatted = new Date(purchase_date);
      const {
        params: { walletId },
        body: data,
      } = httpRequest;

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (isNaN(purchase_date_formatted.getTime())) {
        return badRequest(new InvalidParamError('purchase_date'));
      }

      const product = await this.addProduct.add(walletId, {
        ...data,
        purchase_date: purchase_date_formatted,
      });

      return ok(product);
    } catch (error) {
      return serverError();
    }
  }
}
