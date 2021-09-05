export interface Decrypter {
  decrypt(password: string, passwordHash: string): Promise<boolean>;
}
