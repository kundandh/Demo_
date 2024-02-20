class bookingService{

    static url = "http://localhost:3000/events";

    static async getEvents(){
        return await axios.get(this.url);
    }
    static async getEventDetails(id){
        return await axios.get(this.url+"/"+id);
    }

    static async getTicketPrice(eventId, ticketType) {
        try {
            const response = await axios.get(`${this.url}/${eventId}`);
            const eventDetails = response.data;

            if (eventDetails && eventDetails.price && eventDetails.price[ticketType]) {
                return eventDetails.price[ticketType];
            } else {
                throw new Error(`Ticket price not available for event ID ${eventId} and ticket type ${ticketType}`);
            }
        } catch (error) {
            throw new Error(`Error fetching ticket price: ${error.message}`);
        }
    }

}

export default bookingService;