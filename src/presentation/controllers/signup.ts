import { HttpResponse } from './../protocols/http';
import { Controller } from '../protocols/controller';
import { HttpRequest } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export default class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
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
  }
}
