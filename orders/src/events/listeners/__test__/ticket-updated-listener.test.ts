import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "@xdot2012ticketing/commom";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import mongoose from 'mongoose';

const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);

    const ticket = new Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save()

    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version +1,
        title: 'updated concert',
        price: 999,
        userId: new mongoose.Types.ObjectId().toHexString(), 
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { msg, data, listener, ticket }
}

it('finds, updates and saves a ticket', async () => {
    const { msg, data, listener, ticket } = await setup();
    
    await listener.onMessage(data, msg);

    const newTicket = await Ticket.findById(ticket.id);

    expect(newTicket!.title).toEqual(data.title);
    expect(newTicket!.price).toEqual(data.price);
    expect(newTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, listener } = await setup();
    
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
})

it('does not call ack if the event has a skipped verssion number', async () => {
    const { msg, data, listener } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {
        
    }
    
    expect(msg.ack).not.toHaveBeenCalled();
})