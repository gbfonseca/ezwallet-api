import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

interface RequestBodyType {
  name: string;
  quantity: number;
  price: number;
  purchase_date: Date;
  fees: number;
}

interface RequestParamsType {
  walletId: string;
}

export class AddProductController implements Controller {
  async handle(
    httpRequest: HttpRequest<RequestBodyType, RequestParamsType>,
  ): Promise<HttpResponse<any>> {
    return new Promise((resolve) => resolve(null));
  }
}
