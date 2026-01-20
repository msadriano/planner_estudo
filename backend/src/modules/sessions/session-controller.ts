import { Request, Response } from 'express';
import { sessionCreateSchema } from './session-schema';
import { SessionService } from './session-service';

class SessionController {
  async create(request: Request, response: Response) {
    const userLogin = sessionCreateSchema.parse(request.body);

    const userToken = await SessionService.createSession(userLogin);

    return response.status(200).json(userToken);
  }
}

export { SessionController };
