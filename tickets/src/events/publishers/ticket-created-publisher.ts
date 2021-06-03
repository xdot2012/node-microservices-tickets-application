import { Publisher, Subjects, TicketCreatedEvent } from '@xdot2012ticketing/commom';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}