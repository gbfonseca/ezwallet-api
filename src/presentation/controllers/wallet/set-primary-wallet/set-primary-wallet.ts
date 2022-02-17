import { Controller } from '../../../protocols/controller';
import {
  badRequest,
  HttpRequest,
  HttpResponse,
  MissingParamError,
} from '../create-wallet/create-wallet-protocols';

export class SetPrimaryWalletController implements Controller {
  async handle(
    httpRequest: HttpRequest<unknown, { walletId: string }>,
  ): Promise<HttpResponse<any>> {
    const {
      params: { walletId },
    } = httpRequest;

    if (!walletId) {
      return badRequest(new MissingParamError('walletId'));
    }

    return new Promise((resolve) => resolve(null));
  }
}
