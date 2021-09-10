import {
  badRequest,
  notFoundError,
  serverError,
} from './../../../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Controller } from './../../../protocols/controller';
import { UserModel } from '../../../../domain/models/user';
export class LoggedUser implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse<UserModel>> {
    try {
      const {
        headers: { Authorization },
        user,
      } = httpRequest;

      if (!Authorization) {
        return badRequest(new Error('Authorization must be provided'));
      }

      if (!user) {
        return notFoundError(new Error('User not found or invalid Token'));
      }

      return new Promise((resolve) => resolve(null));
    } catch (error) {
      return serverError();
    }
  }
}
