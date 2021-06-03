import { Publisher, OrderCreatedEvent, Subjects } from '@xdot2012ticketing/commom';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}