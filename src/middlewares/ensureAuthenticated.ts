import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Permission denied! Missing Json Web Token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const tokenPayload = verify(token, authConfig.jwt.secret);

    const { sub } = tokenPayload as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error('Permission denied! Invalid Json Web Token');
  }
}
