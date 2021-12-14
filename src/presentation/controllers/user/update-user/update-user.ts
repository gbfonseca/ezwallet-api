import { UserModel } from './../../../../domain/models/user';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Controller } from './../../../protocols/controller';

export default class UpdateUserController implements Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse<UserModel>> {
    return new Promise((resolve) => resolve(null));
  }
}
