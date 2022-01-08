import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
} from '../create-wallet/create-wallet-protocols';

export class FindWalletController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const { user } = httpRequest;

    if (!user) {
      return badRequest(new Error());
    }

    return new Promise((resolve) => resolve(null));
  }
}
