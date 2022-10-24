import { NextFunction, Request, Response } from 'express';

export function disposeContext() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await req.context.connection.release();
    req.context.logger.info(`End Request   ${req.method} ${req.url}`);
    next();
  };
}
