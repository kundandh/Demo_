

$(document).ready(function(){
    $(document).on('click', '.book-now-btn1', function () {
        console.log("view");
        const eventId = $(this).attr("eventId");
        

        // Redirect to eventDetails.html with the eventId parameter
        window.location.href = `../../html/eventDetails.html?id=${eventId}`;
    });
})