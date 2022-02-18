import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { badRequest } from '../create-wallet/create-wallet-protocols';

export class GetPrimaryWalletController implements Controller {
  async handle(httpRequest: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    const { user } = httpRequest;

    if (!user) {
      return badRequest(new Error('Usuário Inválido'));
    }

    return new Promise((resolve) => resolve(null));
  }
}
