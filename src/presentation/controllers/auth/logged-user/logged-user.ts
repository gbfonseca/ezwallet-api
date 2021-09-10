import { badRequest } from './../../../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Controller } from './../../../protocols/controller';
export class LoggedUser implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const {
      headers: { Authorization },
    } = httpRequest;

    if (!Authorization) {
      return badRequest(new Error('Authorization must be provided'));
    }

    return new Promise((resolve) => resolve(null));
  }
}
