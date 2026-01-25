import path from 'path';
import fs from 'fs/promises';

interface UploadAvatarParams {
  userId: string;
  fileName: string;
}

interface UploadAvatarResult {
  success: boolean;
  avatarUrl: string;
  message: string;
}
export class UploadService {
  
  static async uploadAvatar(
    params: UploadAvatarParams,
  ): Promise<UploadAvatarResult> {
    const { userId, fileName } = params;

    const uploadsBasePath = path.join(__dirname, '../../uploads/users');
    const userPath = path.join(uploadsBasePath, userId);

    try {
      const files = await fs.readdir(userPath);

      const deletePromises = files
        .filter((file) => file.startsWith('avatar_') && file !== fileName)
        .map((file) => fs.unlink(path.join(userPath, file)));

      await Promise.all(deletePromises);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    return {
      success: true,
      avatarUrl: fileName,
      message: 'Avatar enviado com sucesso',
    };
  }
}
