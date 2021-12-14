import { ServerError } from '../errors/server-error';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const notFoundError = (error: Error): HttpResponse => {
  return {
    statusCode: 404,
    body: error,
  };
};

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
};

export const ok = <T = any>(data: T): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};
