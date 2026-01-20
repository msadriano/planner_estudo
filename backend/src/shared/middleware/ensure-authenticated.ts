import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { verifyToken } from '../utils/auth';

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT não enviado', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('Token JWT inválido', 401);
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === 'string') {
    throw new AppError('Token inválido ou expirado', 401);
  }

  request.user = {
    id: decoded.sub as string,
  };

  return next();
}

export { ensureAuthenticated };
