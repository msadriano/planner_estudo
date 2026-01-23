import { Router } from 'express';
import { AuthController } from '@/modules/auth/auth-controller';

const authRoutes = Router();
const authControllers = new AuthController();

authRoutes.post('/', authControllers.recovery);

export { authRoutes };
