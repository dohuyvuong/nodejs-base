import express from 'express';

import { ExampleService } from '../services/example.service';

export const exampleRouter = express.Router();

exampleRouter.get('/example', async (req, res, next) => {
  const service = new ExampleService(req.context);
  const result = await service.test();
  req.context.logger.info(result ? { password: 'test' } : '');
  res.status(200).json(result);
  next();
});
