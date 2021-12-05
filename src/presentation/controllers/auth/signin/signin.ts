import {
  Authentication,
  InvalidParamError,
  badRequest,
  serverError,
  ok,
  MissingParamError,
  HttpRequest,
  HttpResponse,
  Controller,
  notFoundError,
  NotFoundDataError,
} from './signin-protocols';
import { EmailValidator } from '../signup/signup-protocols';

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

      const authenticated = await this.authentication.checkCredentials(
        httpRequest.body,
      );

      return ok(authenticated);
    } catch (error) {
      if (error.message === 'E-mail/Senha incorretos.') {
        return notFoundError(new NotFoundDataError('E-mail/Senha incorretos.'));
      } else {
        return serverError();
      }
    }
  }
}
