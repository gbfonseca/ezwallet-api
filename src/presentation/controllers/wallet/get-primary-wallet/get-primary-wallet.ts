import { GetPrimaryWallet } from '../../../../domain/usecases/wallet/get-primary-wallet';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import {
  badRequest,
  ok,
  serverError,
  WalletModel,
} from '../create-wallet/create-wallet-protocols';

export class GetPrimaryWalletController implements Controller {
  constructor(private readonly getPrimaryWallet: GetPrimaryWallet) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<WalletModel>> {
    try {
      const { user } = httpRequest;

      if (!user) {
        return badRequest(new Error('Usuário Inválido'));
      }

      const primaryWallet = await this.getPrimaryWallet.getPrimary(user.id);

      return ok<WalletModel>(primaryWallet);
    } catch (error) {
      return serverError();
    }
  }
}
