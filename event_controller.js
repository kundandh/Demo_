import bookingService from "../services/bookingService.js";

$(document).ready(function () {
    // Fetch events and display initially
    fetchAndDisplayEvents();

    // Add event listener to checkboxes
    $('.filter-checkbox').change(function () {
        fetchAndDisplayEvents();
    });

    // Add event listener to city dropdown
    $('#cityFilter').change(function () {
        fetchAndDisplayEvents();
    });

    function fetchAndDisplayEvents() {
        bookingService.getEvents()
            .then((response) => {
                let events = response.data;

                // Get selected genres from checkboxes
                let selectedGenres = $('.filter-checkbox:checked').map(function () {
                    return $(this).val();
                }).get();

                // Get selected city from dropdown
                let selectedCity = $('#cityFilter').val();

                // Filter events based on selected genres and city
                let filteredEvents = events.filter(event => {
                    return (selectedGenres.length === 0 || selectedGenres.some(genre => event.genre.includes(genre))) &&
                           (selectedCity === 'All' || event.city.includes(selectedCity));
                });

                displayEvents(filteredEvents);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function displayEvents(events) {
        // Clear existing content
        $(".card-container").empty();

        // Display filtered events
        for (let event of events) {
            let display = `
            <div class="card1">
                <div class="card-image1">
                    <img src="${event.image}" alt="card Image">
                    <div class="overlay1">
                        <div class="card-info1">    
                            <h6>${event.title}</h6>
                            <button class="book-now-btn1" eventId="${event.id}">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
            `;

            $(".card-container").append(display);
        }
    }
});
