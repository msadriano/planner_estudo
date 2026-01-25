import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { AppError } from '../utils/app-error';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const userId = req.user.id;
    const uploadPath = path.join(
      __dirname,
      '../../uploads/users',
      userId.toString(),
    );

    fs.mkdir(uploadPath, { recursive: true })
      .then(() => {
        cb(null, uploadPath);
      })
      .catch((err) => {
        cb(err, uploadPath);
      });
  },
  filename: (req: Request, file, cb) => {
    const timestamp = Date.now();
    const extension = file.originalname.split('.').pop();
    const fileName = `avatar_${timestamp}.${extension}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // Valida o tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens JPG, PNG ou WEBP são permitidas'));
    }
  },
});

export const uploadAvatarMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const multerMiddleware = upload.single('avatar');

  console.log('entrei no mw1');

  multerMiddleware(req, res, (err) => {
    console.log('entrei no mw2');

    if (err) {
      console.log('erro no multer:', err.message);
      return next(
        new AppError(err.message || 'Erro no upload do arquivo', 400),
      );
    }

    if (!req.file) {
      console.log('arquivo não encontrado');
      return next(new AppError('Nenhum arquivo foi enviado', 400));
    }

    console.log('saindo do mw');
    next();
  });
};
