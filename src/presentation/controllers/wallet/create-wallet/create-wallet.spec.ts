import { HttpRequest } from '../../../protocols';
import { CreateWalletController } from './create-wallet';

interface SutTypes {
  sut: CreateWalletController;
}

const makeSut = (): SutTypes => {
  const sut = new CreateWalletController();

  return { sut };
};

describe('CreateWalletController', () => {
  it('should calls create wallet with correct values', async () => {
    const { sut } = makeSut();
    const sutSpy = jest.spyOn(sut, 'handle');

    const httpRequest: HttpRequest = {
      body: {
        name: 'Any Wallet Name',
      },
      user: {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_lastName',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(sutSpy).toHaveBeenCalledWith(httpRequest);
  });
});