import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class GetPrimaryWalletController implements Controller {
  async handle(httpRequest: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    return new Promise((resolve) => resolve(null));
  }
}
