import { SetPrimaryWallet } from '../../../../domain/usecases/wallet/set-primary-wallet';
import { Controller } from '../../../protocols/controller';
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  MissingParamError,
  ok,
  serverError,
  WalletModel,
} from '../create-wallet/create-wallet-protocols';

export class SetPrimaryWalletController implements Controller {
  constructor(private readonly setPrimaryWallet: SetPrimaryWallet) {}

  async handle(
    httpRequest: HttpRequest<unknown, { walletId: string }>,
  ): Promise<HttpResponse<WalletModel>> {
    try {
      const {
        params: { walletId },
      } = httpRequest;

      if (!walletId) {
        return badRequest(new MissingParamError('walletId'));
      }

      const wallet = await this.setPrimaryWallet.setPrimary(walletId);

      return ok<WalletModel>(wallet);
    } catch (error) {
      return serverError();
    }
  }
}
