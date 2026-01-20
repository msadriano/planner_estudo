import {
  userCreateSchema,
  userIdSchema,
  userUpdatePasswordSchema,
  userUpdateSchema,
} from './user-schema';
import { Request, Response } from 'express';
import { UserService } from './user-service';

class UserController {
  async create(request: Request, response: Response) {
    const dataCreateUser = userCreateSchema.parse(request.body);

    const createdUser = await UserService.createUser(dataCreateUser);

    return response.status(201).json(createdUser);
  }

  async update(request: Request, response: Response) {
    const dataUpdateUser = userUpdateSchema.parse(request.body);
    const { id } = userIdSchema.parse(request.params);

    const updatedUser = await UserService.updateUser(dataUpdateUser, id);

    return response.status(200).json(updatedUser);
  }

  async updatePassword(request: Request, response: Response) {
    const { password } = userUpdatePasswordSchema.parse(request.body);
    const { id } = userIdSchema.parse(request.params);

    await UserService.updateUserPassword(password, id);

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { id } = userIdSchema.parse(request.params);

    await UserService.deleteAccount(id);

    return response.status(204).send();
  }
}

export { UserController };
