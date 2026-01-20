import { AppError } from '@/shared/utils/app-error';
import { UserCreateSchema } from './user-schema';
import { prisma } from '@/shared/database/prisma';
import { Prisma } from '@prisma/client';
import { generateHash, compareHash } from '@/shared/utils/hash-password';

class UserService {
  static async createUser(dataUser: UserCreateSchema) {
    try {
      const { name, email, age, phone, password } = dataUser;
      const dataToSave: Prisma.UserCreateInput = { name, email, age, phone };

      if (password) {
        const hash = await generateHash(password);
        dataToSave.password = hash;
      }

      const createdUser = await prisma.user.create({ data: dataToSave });

      return createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AppError('E-mail já cadastrado, tente novamente', 409);
        }
      }
      throw error;
    }
  }
}

export { UserService };
