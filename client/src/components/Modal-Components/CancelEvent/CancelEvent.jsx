import "./cancel-event.scss";

// component imports
import axios from "../../../axiosConfig.jsx";

// notification imports
import { toast } from "react-toastify";
import Toast from "../../Toast/Toast.jsx";

const CancelEvent = ({ event, onClose, onDeleteEvent }) => {
  const successMessage = "Event deleted successfully!";
  const errorMessage = "Error deleting event. Please try again.";

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
        toast(<Toast message={successMessage} />, {
          position: "top-left",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error deleting the event:", errorData);

      toast(<Toast message={errorMessage} />, {
        position: "top-left",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
