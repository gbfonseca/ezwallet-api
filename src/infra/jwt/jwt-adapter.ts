import jwt from 'jsonwebtoken';
import { TokenGenerator } from '../../data/protocols/token-generator';
import * as dotenv from 'dotenv';
dotenv.config();

export class JwtAdapter implements TokenGenerator {
  async generate(id: string): Promise<string> {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });

    return token;
  }
}
