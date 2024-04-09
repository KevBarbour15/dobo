import "./cancel-event.css";

// component imports
import axios from "../../../axiosConfig.jsx";

// notification imports

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
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error deleting the event:", errorData);
    }
    onClose();
  };

  return (
    <div className="cancel-event-container">
      <span>Are you sure you want to cancel this event?</span>
      <button className="button cancel" onClick={handleDelete}>
        Confirm
      </button>
    </div>
  );
};

export default CancelEvent;
