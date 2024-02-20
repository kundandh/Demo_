const receiptsEndpoint = "http://localhost:3000/receipts";

async function addReceiptToServer(userId, eventId, ticketType, numberOfTickets, totalTicketPrice) {
    const newReceipt = {
        userId: userId,
        eventId: eventId,
        ticketType: ticketType,
        numberOfTickets: numberOfTickets,
        totalTicketPrice: totalTicketPrice
    };

    try {
        const response = await fetch(receiptsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReceipt),
        });

        if (!response.ok) {
            throw new Error('Failed to add receipt to server');
        }

        // Receipt added successfully
        console.log('Receipt added to server');
    } catch (error) {
        console.error('Error adding receipt to server:', error.message);
    }
}

export { addReceiptToServer };