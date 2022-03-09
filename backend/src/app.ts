import express from 'express';
import session from 'express-session';
const pgSession = require('connect-pg-simple')(session);
import cors from 'cors';
import helmet from 'helmet';

import { pool } from './database/database';
import authRouter from './routers/authRouter';
import * as errorMiddlewares from './middleware/errorHandler';
import User from './classes/User';

const app = express();

app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET || 'pls no', // todoo
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

app.use(express.static(__dirname + '../frontend/build/index.html'));

app.use('/api/auth', authRouter.router);

app.use('/api/*', function (req, res) {
  res.status(404).send('Error 404: Unknown api endpoint');
});
app.use('/*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.use(errorMiddlewares.errorHandlerMiddleware);

export { app };
