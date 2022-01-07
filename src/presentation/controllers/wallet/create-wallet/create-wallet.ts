import { MissingParamError } from '../../../errors';
import { badRequest } from '../../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class CreateWalletController implements Controller {
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const requiredFields = ['name'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return new Promise((resolve) => resolve(null));
  }
}
