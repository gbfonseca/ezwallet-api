import { badRequest, serverError } from './../../../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Controller } from './../../../protocols/controller';
export class LoggedUser implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        headers: { Authorization },
      } = httpRequest;

      if (!Authorization) {
        return badRequest(new Error('Authorization must be provided'));
      }

      return new Promise((resolve) => resolve(null));
    } catch (error) {
      return serverError();
    }
  }
}
