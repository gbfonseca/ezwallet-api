import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class CreateWalletController implements Controller {
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    return new Promise((resolve) => resolve(null));
  }
}
