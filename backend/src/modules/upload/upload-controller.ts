import { Request, Response } from 'express';
import { UploadService } from './upload-service';

export class UploadController {
  async uploadAvatar(req: Request, res: Response): Promise<Response> {
    const fileName = req.file!.filename;
    const userId = req.user.id;
    const result = await UploadService.uploadAvatar({ userId, fileName });

    return res.status(200).json(result);
  }
}
