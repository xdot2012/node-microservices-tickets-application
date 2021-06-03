import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/orders for post requests', async () => {
    const response = await request(app)
    .post('/api/orders')
    .send({});

    expect(response.status).not.toEqual(404);
});


it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/orders').send({}).expect(401);
});


it('returns an status other than 401 if the user is signed in', async () => {
    const response  = await request(app)
    .post('/api/orders')
    .set('Cookie', global.getJwtCookie())
    .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if the ticket does not exist', async () => {
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.getJwtCookie())
        .send({ ticketId })
        .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    const order = Order.build({
        ticket: ticket,
        userId: 'someUserId',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    await order.save();

    await request(app).post('/api/orders')
    .set('Cookie', global.getJwtCookie())
    .send({ticketId: ticket.id })
    .expect(400);
});

it('reserves a ticket', async() => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.getJwtCookie())
        .send({ ticketId: ticket.id })
        .expect(201)
});

it.todo('emits an order created event')