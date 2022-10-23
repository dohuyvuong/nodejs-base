import express from 'express';

import { exampleRouter } from './constrollers/example.controller';
import { context } from './core/middlewares/context.middleware';

const app = express();

app.use(context());
app.use(exampleRouter);

export { app };
