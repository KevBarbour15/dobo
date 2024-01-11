import { useState } from "react";
import "./notes.css";
import axios from "../../../axiosConfig.js";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../../util/notifications.js";

const ViewNotes = ({ event, onClose, onUpdateEvent }) => {
  const [notes, setNotes] = useState(event.notes);
  const { enqueueSnackbar } = useSnackbar();

  const handleNotesChange = (e) => setNotes(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEventData = {
      ...event,
      notes,
    };
    try {
      const response = await axios.put(
        "/events/update-event",
        updatedEventData
      );
      if (response.status === 200 || response.status === 201) {
        onUpdateEvent(response.data);
        onClose();
        showSuccessNotification(enqueueSnackbar, "Notes updated!");
      } else {
        console.error("Error updating event: ", response);
      }
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-text-form">
        <form onSubmit={handleSubmit}>
          <textarea value={notes} onChange={handleNotesChange}></textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ViewNotes;
