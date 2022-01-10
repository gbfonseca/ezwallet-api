import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { badRequest } from '../../../helpers/http-helper';
import { MissingParamError } from '../../../errors/missing-param-error';

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

    for (const field in requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return new Promise((resolve) => resolve(null));
  }
}
