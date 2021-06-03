import { Subjects, Publisher, OrderCancelledEvent } from '@xdot2012ticketing/commom';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}