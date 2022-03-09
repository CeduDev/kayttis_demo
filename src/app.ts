import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import createHttpError from 'http-errors';

import { pool } from './database/database';
import authRouter from './routers/authRouter';
import * as errorMiddlewares from './middleware/errorHandler';
import User from './classes/User';
import { logger } from "./middleware/logger"

if(!process.env.SESSION_SECRET) {
  console.log("no session secret set, exiting process...")
  process.exit(1)
}
const pgSession = require('connect-pg-simple')(session);

const frontendPath = __dirname.slice(0, -4) + "/frontend"
console.log(frontendPath)
const app = express();

app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(logger)
app.use(express.json());
app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);
declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static(frontendPath + "/build"));
app.use('/api/auth', authRouter.router);

app.use('/api/*', function (req, res, next) {
  next(createHttpError(404, "Unknown api endpoint"))
});
app.use('/*', function (req, res) {
  res.sendFile(frontendPath + "/build/index.html");
});

app.use(errorMiddlewares.errorHandlerMiddleware);

export { app };
