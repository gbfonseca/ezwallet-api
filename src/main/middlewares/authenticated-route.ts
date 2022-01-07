import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getCustomRepository } from 'typeorm';
import { UserTypeormRepository } from '../../infra/db/typeorm/repositories/user/user';
dotenv.config();

type PayloadType = {
  id: string;
};

export default (req: any, res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization;
  const [, token] = authorization.split(' ');
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err: Error, payload: PayloadType) => {
      if (err) {
        return res
          .status(400)
          .json({ auth: false, message: 'Invalid token provided' });
      }
      const userRepository = getCustomRepository(UserTypeormRepository);
      const user = await userRepository.findOne(payload.id);
      req.user = user;
      next();
    },
  );
};
