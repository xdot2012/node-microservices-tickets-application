import express from 'express';
import 'express-async-errors';

import { errorHandler, NotFoundError, currentUser } from '@xdot2012ticketing/commom';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { showTicketsRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update'

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketsRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export { app };