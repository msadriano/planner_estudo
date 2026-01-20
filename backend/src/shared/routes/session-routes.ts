import { Router } from 'express';
import { SessionController } from '@/modules/sessions/session-controller';

const sessionRoutes = Router();
const sessionControllers = new SessionController();

sessionRoutes.post('/', sessionControllers.create);

export { sessionRoutes };
