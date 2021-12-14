import { badRequest } from './../../../helpers/http-helper';
import { UserModel } from './../../../../domain/models/user';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Controller } from './../../../protocols/controller';

export default class UpdateUserController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse<UserModel>> {
    const { user } = httpRequest;

    if (!user) {
      return badRequest(new Error('Usuário inválido.'));
    }

    return new Promise((resolve) => resolve(null));
  }
}
