import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { badRequest } from '../../../helpers/http-helper';
import { MissingParamError } from '../../../errors/missing-param-error';
import { InvalidParamError } from '../../../errors/invalid-param-error';

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
  async handle(
    httpRequest: HttpRequest<RequestBodyType, RequestParamsType>,
  ): Promise<HttpResponse<any>> {
    const requiredFields = ['name', 'quantity', 'price', 'purchase_date'];
    const { purchase_date } = httpRequest.body;

    for (const field in requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    if (isNaN(new Date(purchase_date).getTime())) {
      return badRequest(new InvalidParamError('purchase_date'));
    }

    return new Promise((resolve) => resolve(null));
  }
}
