import express from 'express';
import cors from 'cors';
import { routes } from './shared/routes';
import { ErrorHandler } from './shared/middleware/error-handler';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', 'src', 'uploads')),
);
app.use(ErrorHandler);

export { app };
