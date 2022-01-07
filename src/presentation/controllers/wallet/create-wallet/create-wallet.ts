import { MissingParamError } from '../../../errors';
import { badRequest } from '../../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

type HttpRequestBodyType = {
  name: string;
};

export class CreateWalletController implements Controller {
  async handle(
    httpRequest: HttpRequest<HttpRequestBodyType>,
  ): Promise<HttpResponse<any>> {
    const requiredFields = ['name'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return new Promise((resolve) => resolve(null));
  }
}
