import express from 'express';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@xdot2012ticketing/commom';
import cookieSession from 'cookie-session';


const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export { app };