import { Controller, HttpResponse, HttpRequest } from './../protocols';
import { EmailValidator } from './../protocols/email-validator';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';

export default class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'lastName',
        'email',
        'password',
        'confirmPassword',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email } = httpRequest.body;

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
