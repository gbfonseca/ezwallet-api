import { FindWalletsByUserId } from '../../../../domain/usecases/wallet/find-wallets-by-user-id';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  serverError,
} from '../create-wallet/create-wallet-protocols';

export class FindWalletController implements Controller {
  constructor(private readonly findWalletsByUserId: FindWalletsByUserId) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const { user } = httpRequest;

      if (!user) {
        return badRequest(new Error());
      }

      await this.findWalletsByUserId.find(user.id);

      return new Promise((resolve) => resolve(null));
    } catch (error) {
      return serverError();
    }
  }
}
