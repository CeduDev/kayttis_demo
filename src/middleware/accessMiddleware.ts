import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // todoo
  if (req.session.user && req.session.user.authenticated) {
    next();
  } else {
    next(createHttpError(401));
  }
};

export { checkAuth };
