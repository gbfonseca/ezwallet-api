import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Controller } from './../../../protocols/controller';
export class LoggedUser implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve) => resolve(null));
  }
}
