import { convertDateReadability } from "../../util/formatting.js";
import axios from "../../axiosConfig.js";
import "../../styles/cancel-event.css";

const CancelEvent = ({ event, onClose, onDeleteEvent }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete("/events/delete-event", {
        data: {
          eventId: event._id,
          attendeeIds: event.attendees,
        },
      });

      if (response.status === 200 || response.status === 201) {
        onDeleteEvent(event._id);
        console.log("Event deleted successfully!");
      } else {
        console.error("Error deleting event:", response);
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error deleting the event:", errorData);
    }
    onClose();
  };

  return (
    <div className="cancel-event-container">
      <div className="cancel-event-date">
        <h1>{convertDateReadability(event.date)}</h1>
      </div>
      <p>Are you sure you want to cancel this event?</p>
      <button onClick={handleDelete}>Cancel Event</button>
    </div>
  );
};

export default CancelEvent;
