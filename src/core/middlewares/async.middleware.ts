import { NextFunction, Request, Response } from 'express';

export function asyncMiddleware(execFunc: (req: Request, res: Response) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await execFunc(req, res);
      next();
    } catch (error) {
      next(error);
    }
  };
}
