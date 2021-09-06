export interface Encrypter {
  encrypt(value: string): Promise<string>;
  decrypt(password: string, passwordHash: string): Promise<boolean>;
}
