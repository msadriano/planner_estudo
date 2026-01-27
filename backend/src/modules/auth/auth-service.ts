import { AppError } from '@/shared/utils/app-error';
import { PasswordRecoverySchema } from './auth-schema';
import { prisma } from '@/shared/database/prisma';
import { generateToken, verifyToken } from '@/shared/utils/auth';
import { env } from '@/config/env';

class AuthService {
  static async passwordRecovery(data: PasswordRecoverySchema) {
    const { email } = data;

    const hasEmail = await prisma.user.findUnique({ where: { email } });

    if (!hasEmail) {
      throw new AppError('Email não encontrado', 404);
    }

    const token = generateToken(hasEmail.id, '1d', 'recovery');

    const recoveryLink = `${env.BASEURL}/restartpassword/${token}`;

    console.log(recoveryLink);

    return token;
  }
}

export { AuthService };
