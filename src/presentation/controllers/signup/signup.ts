import {
  Controller,
  HttpResponse,
  HttpRequest,
  EmailValidator,
  AddAccount,
} from './signup-protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers';

export default class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({
        email,
        name,
        lastName,
        password,
      });

      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}