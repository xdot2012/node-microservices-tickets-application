import { Publisher, Subjects, TicketUpdatedEvent } from '@xdot2012ticketing/commom';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}