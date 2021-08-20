import { EmailValidator } from '../../presentation/protocols/email-validator';
import { EmailValidatorAdapter } from './email-validator-adapter';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdapter();
};

describe('EmailValidatorAdapter', () => {
  test('should EmailValidator returns false if email is false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@email.com');
    expect(isValid).toBe(false);
  });
  test('should EmailValidator returns true if email is true', () => {
    const sut = makeSut();
    const isValid = sut.isValid('valid_email@email.com');
    expect(isValid).toBe(true);
  });
  test('should EmailValidator calls with correct email', () => {
    const sut = makeSut();
    const isValidSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('valid_email@email.com');
    expect(isValidSpy).toHaveBeenCalledWith('valid_email@email.com');
  });
});
