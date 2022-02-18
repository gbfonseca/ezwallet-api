import {
  GetPrimaryWallet,
  Controller,
  HttpRequest,
  HttpResponse,
  badRequest,
  ok,
  serverError,
  WalletModel,
} from './get-primary-wallet-protocols';

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
