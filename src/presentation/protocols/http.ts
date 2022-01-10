import { UserModel } from '../../domain/models/user';

export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<T = any, P = any> {
  body?: T;
  params?: P;
  headers?: {
    authorization?: string;
  };
  user?: UserModel;
}
