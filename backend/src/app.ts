import express from 'express';
import cors from 'cors';
import { routes } from './shared/routes';
import { ErrorHandler } from './shared/middleware/error-handler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)
app.use(ErrorHandler);

export { app };
