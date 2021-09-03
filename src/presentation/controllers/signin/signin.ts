import { Authentication } from './../../../domain/usecases/authentication';
import { InvalidParamError } from './../../errors/invalid-param-error';
import { EmailValidator } from './../../protocols/email-validator';
import { badRequest, serverError, ok } from './../../helpers/http-helper';
import { MissingParamError } from './../../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../../protocols';
import { Controller } from './../../protocols/controller';
export class SignInController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication,
  ) {}

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

      const authenticated = this.authentication.checkCredentials(
        httpRequest.body,
      );

      return ok(authenticated);
    } catch (error) {
      return serverError();
    }
  }
}
