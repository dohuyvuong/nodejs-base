import express from 'express';

import { asyncMiddleware } from '../core/middlewares/async.middleware';
import { ExampleService } from '../services/example.service';

export const exampleRouter = express.Router();

exampleRouter.get(
  '/examples',
  asyncMiddleware(async (req, res) => {
    const service = new ExampleService(req.context);
    const result = await service.getExamples();
    res.status(200).json(result);
  })
);

exampleRouter.get(
  '/examples/:id',
  asyncMiddleware(async (req, res) => {
    const exampleId = +req.params.id;
    const service = new ExampleService(req.context);
    const result = await service.getExample(exampleId);
    res.status(200).json(result);
  })
);
