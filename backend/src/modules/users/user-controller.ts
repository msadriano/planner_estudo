import {
  userAvatarUpdateUrlSchema,
  userCreateSchema,
  userIdSchema,
  userUpdatePasswordBodySchema,
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
    const body = userUpdatePasswordBodySchema.parse(request.body);
    const header = request.headers.authorization as string;

    await UserService.updateUserPassword(body, header);

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { id } = userIdSchema.parse(request.params);

    await UserService.deleteAccount(id);

    return response.status(204).send();
  }

  async show(request: Request, response: Response) {
    const userId = request.user.id;

    const user = await UserService.showUser(userId);

    console.log(user);

    return response.status(200).json(user);
  }

  async updateMe(request: Request, response: Response) {
    const { avatar_url } = userAvatarUpdateUrlSchema.parse(request.body);
    const userId = request.user.id;

    const updatedUser = await UserService.updateUser({ avatar_url }, userId);

    return response.status(200).json(updatedUser);
  }
}

export { UserController };
