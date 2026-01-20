import { userCreateSchema } from './user-schema';
import { Request, Response } from 'express';
import { UserService } from './user-service';

class UserController {
  async create(request: Request, response: Response) {
    const dataUser = userCreateSchema.parse(request.body);

    const createdUser = await UserService.createUser(dataUser);

    const { password, ...userWithoutPassword } = createdUser;

    return response.status(201).json(userWithoutPassword);
  }
}

export { UserController };
