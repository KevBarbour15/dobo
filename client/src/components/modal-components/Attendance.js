import { useEffect, useState } from "react";
import { convertDateReadability } from "../../util/formatting.js";
import axios from "../../axiosConfig";
import Attendee from "../Attendee.js";

const Attendance = ({ event, onClose, onUpdateEvent }) => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.post("/attendees/get-by-ids", {
          eventId: event._id,
          attendeeIds: event.attendees,
        });

        setAttendees(response.data);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    if (event && event.attendees) {
      fetchAttendees();
    }
  }, [event]);

  const updateAttendeeStatus = async (attendeeId, newStatus, ogStatus) => {
    if (newStatus === ogStatus) return;

    try {
      const response = await axios.put("/attendees/update-status", {
        attendeeId,
        status: newStatus,
        eventId: event._id,
        ogStatus: ogStatus,
      });

      setAttendees(
        attendees.map((attendee) =>
          attendee._id === attendeeId
            ? { ...attendee, status: newStatus }
            : attendee
        )
      );

      if (response.status === 200 || response.status === 201) {
        onUpdateEvent(response.data);
      } else {
        console.error("Error updating event: ", response);
      }
    } catch (error) {
      console.error("Error updating attendee status: ", error);
    }
  };

  return (
    <div>
      <h1>{convertDateReadability(event.date)}</h1>
      {attendees.map((attendee) => (
        <Attendee
          key={attendee._id}
          attendee={attendee}
          onStatusChange={updateAttendeeStatus}
        />
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Attendance;
