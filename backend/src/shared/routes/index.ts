import { Router } from 'express';
import { userRoutes } from './user-routes';
import { sessionRoutes } from './session-routes';
import { authRoutes } from './auth-routes';
import { uploadRoutes } from './upload-routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/auth', authRoutes);
routes.use('/upload', uploadRoutes)

export { routes };
