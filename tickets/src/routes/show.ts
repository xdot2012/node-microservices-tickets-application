import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@xdot2012ticketing/commom';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) {
        throw new NotFoundError(); 
    }

    res.send(ticket);
});

export { router as showTicketsRouter };