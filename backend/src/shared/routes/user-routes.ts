import { Router } from 'express';
import { UserController } from '@/modules/users/user-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { ensureOwner } from '../middleware/ensure-owner';

const userRoutes = Router();
const userControllers = new UserController();

userRoutes.post('/', userControllers.create);

userRoutes.use(ensureAuthenticated);

userRoutes.put('/:id', ensureOwner('user'), userControllers.update);
userRoutes.patch(
  '/password',
  ensureOwner('user'),
  userControllers.updatePassword,
);
userRoutes.delete('/:id', ensureOwner('user'), userControllers.delete);

export { userRoutes };
