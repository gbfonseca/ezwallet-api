import { SetPrimaryWallet } from '../../../../domain/usecases/wallet/set-primary-wallet';
import { Controller } from '../../../protocols/controller';
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  MissingParamError,
  serverError,
} from '../create-wallet/create-wallet-protocols';

export class SetPrimaryWalletController implements Controller {
  constructor(private readonly setPrimaryWallet: SetPrimaryWallet) {}

  async handle(
    httpRequest: HttpRequest<unknown, { walletId: string }>,
  ): Promise<HttpResponse<any>> {
    try {
      const {
        params: { walletId },
      } = httpRequest;

      if (!walletId) {
        return badRequest(new MissingParamError('walletId'));
      }

      await this.setPrimaryWallet.setPrimary(walletId);

      return new Promise((resolve) => resolve(null));
    } catch (error) {
      return serverError();
    }
  }
}
