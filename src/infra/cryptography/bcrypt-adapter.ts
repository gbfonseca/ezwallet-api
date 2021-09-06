import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encrypter';
import { Decrypter } from '../../data/protocols/decrypter';

export class BcryptAdapter implements Encrypter, Decrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async decrypt(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
