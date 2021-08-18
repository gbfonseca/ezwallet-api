import {
  Controller,
  HttpResponse,
  HttpRequest,
  EmailValidator,
} from './signup-protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers';
import { AddAccount } from '../../../domain/protocols';

export default class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

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
      const { name, lastName, email, password, confirmPassword } =
        httpRequest.body;

      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'));
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = this.addAccount.add({
        email,
        name,
        lastName,
        password,
      });

      return {
        statusCode: 200,
        body: account,
      };
    } catch (error) {
      return serverError();
    }
  }
}
