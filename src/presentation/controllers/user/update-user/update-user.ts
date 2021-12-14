import { InvalidParamError } from './../../../errors/invalid-param-error';
import { EmailValidator } from './../../../protocols/email-validator';
import {
  UpdateUser,
  UpdateUserModel,
} from './../../../../domain/usecases/update-user';
import { badRequest, serverError, ok } from './../../../helpers/http-helper';
import { UserModel } from './../../../../domain/models/user';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Controller } from './../../../protocols/controller';

export default class UpdateUserController implements Controller {
  constructor(
    private readonly updateUser: UpdateUser,
    private readonly emailValidator: EmailValidator,
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserModel>,
  ): Promise<HttpResponse<UserModel>> {
    try {
      const { user, body } = httpRequest;

      if (!user) {
        return badRequest(new Error('Usuário inválido.'));
      }

      const emailIsValid = this.emailValidator.isValid(body.email);

      if (!emailIsValid) {
        return badRequest(new InvalidParamError('E-mail'));
      }

      const updatedUser = await this.updateUser.update(body);

      return ok<UserModel>(updatedUser);
    } catch (error) {
      return serverError();
    }
  }
}
