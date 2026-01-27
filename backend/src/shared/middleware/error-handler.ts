import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { z, ZodError } from 'zod';

function ErrorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: error, message: error.message });
  }

  if (error instanceof ZodError) {
    // Zod v4 usa 'issues' em vez de 'errors'
    return response.status(400).json({
      status: 'error',
      message: 'Dados de entrada inválidos',
      issues: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  console.log(error);
  return response.status(500).json({ message: 'Erro Interno do Servidor' });
}

export { ErrorHandler };
