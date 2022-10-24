import { NextFunction, Request, Response } from 'express';

import { AppContext } from '../context/app-context';

export function useContext() {
  return (req: Request, res: Response, next: NextFunction): void => {
    const appContext = new AppContext();
    req.context = appContext;
    req.context.logger.info(`Start Request ${req.method} ${req.url}`);
    next();
  };
}
