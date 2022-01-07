import { WalletModel } from '../../../../domain/models/wallet';
import { AddWallet } from '../../../../domain/usecases/wallet/add-wallet';
import { MissingParamError } from '../../../errors';
import { badRequest, ok, serverError } from '../../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

type HttpRequestBodyType = {
  name: string;
};

export class CreateWalletController implements Controller {
  constructor(private readonly addWallet: AddWallet) {}

  async handle(
    httpRequest: HttpRequest<HttpRequestBodyType>,
  ): Promise<HttpResponse<WalletModel>> {
    try {
      const requiredFields = ['name'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const wallet = await this.addWallet.add(
        httpRequest.body,
        httpRequest.user,
      );

      return ok(wallet);
    } catch (error) {
      return serverError();
    }
  }
}
