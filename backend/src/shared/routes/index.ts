import { Router } from 'express';
import { userRoutes } from './user-routes';
import { sessionRoutes } from './session-routes';
import { authRoutes } from './auth-routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/auth', authRoutes);

export { routes };
