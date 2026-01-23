import { prisma } from '@/shared/database/prisma';
import { SessionCreateSchema } from './session-schema';
import { AppError } from '@/shared/utils/app-error';
import { generateToken } from '@/shared/utils/auth';
import { compareHash } from '@/shared/utils/hash-password';

class SessionService {
  static async createSession(userLogin: SessionCreateSchema) {
    const { email, password } = userLogin;
    
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user || !user.password) {
      throw new AppError('Usuário e/ou senha inválidos', 401);
    }

    const passwordMatched = await compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Usuário e/ou senha inválidos', 401);
    }

    const token = generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}

export { SessionService };
