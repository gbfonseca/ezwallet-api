import { FindWalletsByUserId } from '../../../../domain/usecases/wallet/find-wallets-by-user-id';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  WalletModel,
} from '../create-wallet/create-wallet-protocols';

export class FindWalletController implements Controller {
  constructor(private readonly findWalletsByUserId: FindWalletsByUserId) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<WalletModel[]>> {
    try {
      const { user } = httpRequest;

      if (!user) {
        return badRequest(new Error());
      }

      const wallets = await this.findWalletsByUserId.find(user.id);

      return ok(wallets);
    } catch (error) {
      return serverError();
    }
  }
}
