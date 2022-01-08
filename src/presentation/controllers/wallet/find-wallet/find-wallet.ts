import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../create-wallet/create-wallet-protocols';

export class FindWalletController implements Controller {
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    return new Promise((resolve) => resolve(null));
  }
}
