import { NextFunction, Request, Response } from 'express';

export function dispose() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await req.context.connection.release();
    req.context.logger.info(`[END REQUEST] [${req.method}] ${req.url}`);
    return next();
  };
}
