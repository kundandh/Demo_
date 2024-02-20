import bookingService from "./services/bookingService.js";
import { addReceiptToServer } from "./services/receiptStorageService.js";
$(document).ready(function () {
    // Fetch event ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('eventId');
    const userId = urlParams.get('userId');
    const ticketType = urlParams.get('ticketType').toLowerCase();
    const numberOfTickets = urlParams.get('numberOfTickets');
    let ticketPrice;


    bookingService.getTicketPrice(eventId, ticketType)
    .then((price) => {
        // Handle the ticket price
        ticketPrice = price;
    })
    .catch((error) => {
        // Handle errors, if any
        console.error(error.message);
    });



    bookingService.getEventDetails(eventId)
        .then((response) => {
            const eventDetails = response.data;
            const fare = numberOfTickets*ticketPrice;
            
            let display = `
            <tbody>
                <tr class="table-dark text-center">
                    <td colspan="2"><b>${eventDetails.title}</b></td>
                </tr>
                <tr class="table-dark text-center">
                    <td colspan="2"><b>Venue:</b> ${eventDetails.venue}</td>
                </tr>
                <tr class="table-dark text-center">
                    <td colspan="2"><b>${eventDetails.date}</b></td>
                </tr>
                <tr class="table-light">
                    <td><b>Ticket Type:</b></td>
                    <td>${ticketType}</td>
                </tr>
                <tr class="table-light">
                    <td><b>Number of Tickets:</b></td>
                    <td>${numberOfTickets}</td>
                </tr>
                <tr class="table-light">
                    <td><b>Ticket Price:</b></td>
                    <td>₹${ticketPrice}</td>
                </tr>
                <tr class="table-light">
                    <td><b>Total Fare:</b> ${ticketType} (${numberOfTickets}) X ${ticketPrice}</td>
                    <td><b>₹${fare}</b></td>
                </tr>
    
            </tbody>
            <br>
            
            `;

            $("#receiptDetails").append(display);
        })
        .catch((error) => {
            console.log(error);
        });

        $("#continue").on('click', function () {
            // Store receipt details on the server
            const fare = numberOfTickets*ticketPrice;
            addReceiptToServer(userId, eventId, ticketType, numberOfTickets, fare);
            console.log(userId);
            // Perform any other actions needed when continuing
    
            // For example, redirect to another page
            window.location.href = "../html/feedback.html";
        });
});
