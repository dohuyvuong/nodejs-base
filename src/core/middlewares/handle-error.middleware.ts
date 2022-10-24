import { NextFunction, Request, Response } from 'express';

export function handleError() {
  return (error: Error, req: Request, res: Response, next: NextFunction): void => {
    req.context.logger.unhandledError(error);
    res.status(500).json(error);
    next();
  };
}
