import Router from 'express';
import { UploadController } from '@/modules/upload/upload-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { ensureOwner } from '../middleware/ensure-owner';
import { uploadAvatarMiddleware } from '../middleware/uploadMiddleware';

const uploadRoutes = Router();
const uploadControllers = new UploadController();

uploadRoutes.post(
  '/avatar',
  ensureAuthenticated,
  uploadAvatarMiddleware,
  uploadControllers.uploadAvatar,
);

export { uploadRoutes };
