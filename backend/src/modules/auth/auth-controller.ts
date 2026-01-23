import { Request, Response } from 'express';
import { passwordRecoverySchema } from './auth-schema';
import { AuthService } from './auth-service';

class AuthController {
  async recovery(request: Request, response: Response) {
    const data = passwordRecoverySchema.parse(request.body)
    
    await AuthService.passwordRecovery(data)

    return response.status(200).send();
  }
}

export { AuthController };
