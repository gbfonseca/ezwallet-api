import { Controller } from '../../../protocols/controller';
import {
  HttpRequest,
  HttpResponse,
} from '../create-wallet/create-wallet-protocols';

export class SetPrimaryWalletController implements Controller {
  async handle(
    httpRequest: HttpRequest<void, { walletId: string }>,
  ): Promise<HttpResponse<any>> {
    return new Promise((resolve) => resolve(null));
  }
}
