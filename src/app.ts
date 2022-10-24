import express from 'express';

import { apiRouter } from './api.router';
import { disposeContext } from './core/middlewares/dispose-context.middleware';
import { useContext } from './core/middlewares/use-context.middleware';

const app = express();

app.use(useContext());

app.use('/api', apiRouter);

app.use(disposeContext());

export { app };
