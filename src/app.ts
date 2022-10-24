import express from 'express';

import { exampleRouter } from './controllers/example.controller';
import { context } from './core/middlewares/context.middleware';
import { dispose } from './core/middlewares/dispose.middleware';

const app = express();

app.use(context());
app.use(exampleRouter);
app.use(dispose());

export { app };
