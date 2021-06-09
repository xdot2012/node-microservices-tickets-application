import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
    // Create ticket
    const ticket = Ticket.build({
        title:"concert",
        price: 5,
        userId: '123'
    })
    // Save
    await ticket.save();

    // Fetch it twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // Make two changes
    firstInstance!.set({price: 10});
    secondInstance!.set({price: 20});
    // Save the first one
    await firstInstance!.save();

    // Save the second one and expect an error
    try {
        await secondInstance!.save();
    } catch (err) {
        return done();
    }
    throw new Error("Should not reach this point");
});

it('increments the version number between saves', async() => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: '123'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);

    await ticket.save();
    expect(ticket.version).toEqual(1);

    await ticket.save();
    expect(ticket.version).toEqual(2);

})