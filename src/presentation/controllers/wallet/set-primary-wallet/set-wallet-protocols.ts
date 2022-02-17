export { WalletModel } from '../../../../domain/models/wallet';
export { MissingParamError } from '../../../errors';
export { badRequest, ok, serverError } from '../../../helpers';
export { Controller, HttpRequest, HttpResponse } from '../../../protocols';
export { SetPrimaryWalletController } from './set-primary-wallet';
export { SetPrimaryWallet } from '../../../../domain/usecases/wallet/set-primary-wallet';
