import {
  InvalidParamError,
  EmailValidator,
  UpdateUser,
  UpdateUserModel,
  badRequest,
  serverError,
  ok,
  UserModel,
  HttpRequest,
  HttpResponse,
  Controller,
} from './update-user-protocols';

export class UpdateUserController implements Controller {
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

      if (body.email) {
        const emailIsValid = this.emailValidator.isValid(body.email);

        if (!emailIsValid) {
          return badRequest(new InvalidParamError('E-mail'));
        }
      }

      const updatedUser = await this.updateUser.update(user, body);

      return ok<UserModel>(updatedUser);
    } catch (error) {
      return serverError();
    }
  }
}
