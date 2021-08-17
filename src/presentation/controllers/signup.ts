import { HttpResponse } from './../protocols/http';
import { Controller } from '../protocols/controller';
import { HttpRequest } from '../protocols/http';

export default class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: null,
    };
  }
}
