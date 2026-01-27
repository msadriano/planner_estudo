import { AppError } from '@/shared/utils/app-error';
import {
  UserCreateSchema,
  UserUpdatePasswordBodySchema,
  UserUpdateSchema,
} from './user-schema';
import { prisma } from '@/shared/database/prisma';
import { Prisma } from '@prisma/client';
import { generateHash } from '@/shared/utils/hash-password';
import { verifyToken } from '@/shared/utils/auth';

class UserService {
  static async createUser(dataUser: UserCreateSchema) {
    const { name, email, age, phone, password, updatedPasswordAt } = dataUser;

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError('E-mail já cadastrado, tente novamente', 409);
    }

    const dataToSave: Prisma.UserCreateInput = {
      name,
      email,
      age,
      phone,
      updatedPasswordAt,
    };

    if (password) {
      const hash = await generateHash(password);
      dataToSave.password = hash;
    }

    const createdUser = await prisma.user.create({ data: dataToSave });

    const { password: _, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  static async updateUser(
    dataUpdateUser: Partial<UserUpdateSchema>,
    id: string,
  ) {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (dataUpdateUser.email) {
      const userWithSameEmail = await prisma.user.findFirst({
        where: {
          email: dataUpdateUser.email,
          id: { not: id },
        },
      });

      if (userWithSameEmail) {
        throw new AppError('Este e-mail já está em uso por outro usuário', 400);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataUpdateUser,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  static async updateUserPassword(
    body: UserUpdatePasswordBodySchema,
    header: string,
  ) {
    
    const { password: newPassword, updatedPasswordAt } = body;

    const [, token] = header.split(' ');

    const decoded = verifyToken(token);

    if (!decoded || typeof decoded === 'string' || !decoded.sub) {
      throw new AppError('Token inválido ou expirado', 401);
    }

    const { sub: id } = decoded;

    const userFound = await prisma.user.findUnique({ where: { id } });

    if (!userFound) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const hashedPassword = await generateHash(newPassword);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword, updatedPasswordAt },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    console.log(userWithoutPassword);
    return userWithoutPassword;
  }

  static async deleteAccount(id: string) {
    const userFound = await prisma.user.findUnique({ where: { id } });

    if (!userFound || userFound.deletedAt) {
      throw new AppError('Usuário não encontrado', 404);
    }

    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static async showUser(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

export { UserService };
