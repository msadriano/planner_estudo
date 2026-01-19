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
    return response.status(400).json({
      status: error,
      message: 'Erro de Validação',
      issues: error.format(),
    });
  }

  console.log(error);
  return response.status(500).json({ message: 'Erro Interno do Servidor' });
}

export { ErrorHandler };
