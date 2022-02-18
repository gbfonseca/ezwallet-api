import { GetPrimaryWallet } from '../../../../domain/usecases/wallet/get-primary-wallet';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import {
  badRequest,
  serverError,
} from '../create-wallet/create-wallet-protocols';

export class GetPrimaryWalletController implements Controller {
  constructor(private readonly getPrimaryWallet: GetPrimaryWallet) {}

  async handle(httpRequest: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    try {
      const { user } = httpRequest;

      if (!user) {
        return badRequest(new Error('Usuário Inválido'));
      }

      await this.getPrimaryWallet.getPrimary(user.id);

      return new Promise((resolve) => resolve(null));
    } catch (error) {
      return serverError();
    }
  }
}
