import { NextFunction, Request, Response } from 'express';

import { AppContext } from '../context/app-context';

export function context() {
  return (req: Request, res: Response, next: NextFunction): void => {
    const appContext = new AppContext();
    req.context = appContext;
    return next();
  };
}
