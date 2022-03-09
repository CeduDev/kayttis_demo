import * as authService from '../services/authService';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import User from '../classes/User';

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.username || !req.body.password) {
    return next(createHttpError(400, 'No username or password provided'));
  }
  const result = await authService.selectUserByUsername(req.body.username);
  if (result.rows.length !== 1) {
    return next(createHttpError(400, 'Invalid email or password'));
  }
  const row = result.rows[0];
  if (!(await bcrypt.compare(req.body.password, result.rows[0].hash))) {
    return next(createHttpError(400, 'Invalid email or password'));
  }
  const user: User = {
    id: row.id,
    username: row.username,
    authenticated: true,
  };
  req.session.user = user;
  return res.status(200).json({ message: 'succesfully authenticated' });
};

const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.username || !req.body.password) {
    return next(createHttpError(400, 'No username or password provided'));
  }
  try {
    const result = await authService.selectUserByUsername(req.body.username);
    if (result.rows.length !== 0) {
      return next(createHttpError(400, 'Username already in use')); // todoo: make unique in db
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    await authService.insertUser(req.body.username, hash);
  } catch (e: any) {
    return next(createHttpError(500, e));
  }
  return res.status(200).json({ message: 'Registration successfull' });
};

const getLogout = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session);
  req.session.destroy(() => {}); // todoo
  res.status(200).json({ message: 'Successfully logged out' });
};

export { postLogin, postRegister, getLogout };
