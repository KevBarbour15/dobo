import "./cancel-event.css";
import axios from "../../../axiosConfig.js";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../../util/notifications.js";

const CancelEvent = ({ event, onClose, onDeleteEvent }) => {
  const { enqueueSnackbar } = useSnackbar();

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
        showSuccessNotification(enqueueSnackbar, "Event canceled!");
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error deleting the event:", errorData);
    }
    onClose();
  };

  return (
    <div className="cancel-event-container">
      <p>Are you sure you want to cancel this event?</p>
      <button onClick={handleDelete}>Cancel Event</button>
    </div>
  );
};

export default CancelEvent;
