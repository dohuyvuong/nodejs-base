import express from 'express';

import { exampleRouter } from './controllers/example.controller';
import { handleError } from './core/middlewares/handle-error.middleware';

export const apiRouter = express.Router();

[exampleRouter].forEach((router) => apiRouter.use(router));

apiRouter.use(handleError());
