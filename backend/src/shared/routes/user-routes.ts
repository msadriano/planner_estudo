import { Router } from 'express';
import { UserController } from '@/modules/users/user-controller';

const userRoutes = Router();
const userControllers = new UserController();

userRoutes.post('/', userControllers.create);

export { userRoutes };
