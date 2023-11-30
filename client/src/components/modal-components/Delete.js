import React from "react";
import { convertDateReadability } from "../../helpers/formatting.js";
import axios from "../../axiosConfig";

const Delete = ({ event, onClose, onDeleteEvent }) => {
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
    <div>
      <h1>{convertDateReadability(event.date)}</h1>
      <h2>Are you sure you want to delete this event?</h2>
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
