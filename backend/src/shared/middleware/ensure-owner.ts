import { Response, Request, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../utils/app-error';
import { verifyToken } from '../utils/auth';

export const ensureOwner = (model: keyof typeof prisma) => {
  return async (request: Request, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não fornecido', 401);
    }

    const [, token] = authHeader.split(' ');

    const decoded = verifyToken(token);

    const id = decoded?.sub;

    const authenticatedUserId = request.user.id;

    const includeConfig: any = {
      subject: { planner: true },
      topic: { subject: { include: { planner: true } } },
    };

    const resource = await (prisma[model] as any).findUnique({
      where: { id },
      include: includeConfig[model] || undefined,
    });

    if (!resource) {
      throw new AppError('Recurso não encontrado', 404);
    }

    let ownerId: string | undefined;

    switch (model) {
      case 'user':
        ownerId = resource.id;
        break;
      case 'planner':
      case 'task':
        ownerId = resource.userId;
        break;
      case 'subject':
        ownerId = resource.planner?.userId;
        break;
      case 'topic':
        ownerId = resource.subject?.planner?.userId;
        break;

      default:
        throw new AppError(
          'Entidade não suportada para verificação do dono',
          500,
        );
    }

    if (!ownerId || ownerId !== authenticatedUserId) {
      throw new AppError(
        'Acesso negado: você não tem autorização para acessar o recurso',
        403,
      );
    }

    return next();
  };
};
