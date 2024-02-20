import bookingService from "./services/bookingService.js";
//this was a sample 
$(document).ready(function () {
    // Fetch event ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    // Fetch event details based on the ID
    bookingService.getEventDetails(eventId)
        .then((response) => {
            const eventDetails = response.data;

            // Populate HTML elements with event details
            $("#eventTitle").text(eventDetails.title);
            $("#eventID").text(eventDetails.id);
            $("#eventGenre").text(eventDetails.genre.join(', '));
            $("#eventDuration").text(eventDetails.duration_minutes + " minutes");
            $("#eventLanguage").text(eventDetails.language.join(', '));
            $("#eventArtist").text(eventDetails.artist);
            $("#eventRating").text(eventDetails.rating);
            $("#eventDescription").text(eventDetails.description);
            $("#eventDate").text(eventDetails.date);
            $("#eventVenue").text(eventDetails.venue);
            $("#eventTime").text(eventDetails.time);

            // Event listener for "Book Ticket" button click
            $("#bookTicket").on('click', function () {
                // Dynamically add radio buttons and counter
                generateTicketOptions(eventDetails);
            });

            // Function to dynamically generate ticket options
            function generateTicketOptions(eventDetails) {
                const zonesDiv = $('.zones');

                // Clear existing content
                zonesDiv.empty();

                // Ticket types with prices
                const ticketTypes = Object.keys(eventDetails.price).map(type => ({
                    name: type.charAt(0).toUpperCase() + type.slice(1),
                    price: eventDetails.price[type]
                }));

                // Create radio buttons and labels for ticket types
                $.each(ticketTypes, function (index, type) {
                    const formCheckDiv = $('<div>').addClass('form-check');
                    const label = $('<label>').addClass('form-check-label').html(`
                        <input class="form-check-input" type="radio" name="ticketType" value="${type.name}">
                        ${type.name} - ₹${type.price}
                    `);
                    zonesDiv.append(label);
                });

                // Create a counter for the number of tickets
                const counterLabel = $('<label>').html(`Number of Tickets: <input type="number" id="ticketCounter" min="1" value="1">`);
                zonesDiv.append(counterLabel);

                // Create "Proceed" button
                const proceedButton = $('<input>').attr({ type: 'button', value: 'Proceed', class: 'proceedButton btn btn-outline-dark' });
                proceedButton.on('click', function () {
                    handleProceed(eventDetails);
                });
                zonesDiv.append(proceedButton);
            }

            // Function to handle "Proceed" button click
            // Function to handle "Proceed" button click
function handleProceed(eventDetails) {
    const selectedTicketType = $('input[name="ticketType"]:checked').val();
    const numberOfTickets = $('#ticketCounter').val();



    // Redirect to another page with booking details
    const userId = "user123"; // Replace with the actual user ID
    const queryString = `eventId=${eventId}&userId=${userId}&ticketType=${selectedTicketType}&numberOfTickets=${numberOfTickets}`; // Corrected parameter name

    window.location.href = `../../html/eventReceipt.html?${queryString}`;
}

        })
        .catch((error) => {
            console.log("Error fetching event details:", error);
        });
});
