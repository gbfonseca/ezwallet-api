import { InvalidParamError } from './../../errors/invalid-param-error';
import { EmailValidator } from './../../protocols/email-validator';
import { badRequest, serverError } from './../../helpers/http-helper';
import { MissingParamError } from './../../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../../protocols';
import { Controller } from './../../protocols/controller';
export class SignInController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return new Promise((resolve) => resolve(null));
    } catch (error) {
      return serverError();
    }
  }
}
