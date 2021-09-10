import { UserModel } from '../../domain/models/user';

export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<T = any> {
  body?: T;
  headers?: {
    Authorization?: string;
  };
  user?: UserModel;
}
