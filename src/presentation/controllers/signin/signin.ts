import { badRequest } from './../../helpers/http-helper';
import { MissingParamError } from './../../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../../protocols';
import { Controller } from './../../protocols/controller';
export class SignInController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      return new Promise((resolve) => resolve(null));
    } catch (error) {
      console.error(error);
    }
  }
}
