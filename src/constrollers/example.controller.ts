import express from 'express';

import { DbContext } from '../core/context/db-context';
import { ExampleService } from '../services/example.service';

export const exampleRouter = express.Router();

exampleRouter.get('/example', async (_req, res, _next) => {
  const dbContext = new DbContext();
  const service = new ExampleService(dbContext);
  const result = await service.test();
  res.status(200).json(result);
});
