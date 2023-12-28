import { useEffect, useState } from "react";
import "./attendance.css";
import { convertDateReadability } from "../../../util/formatting.js";
import axios from "../../../axiosConfig.js";
import Attendee from "./Attendee/Attendee.js";

const Attendance = ({ event, onUpdateEvent }) => {
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

  const updateAttendeeStatus = async (
    attendeeId,
    newStatus,
    ogStatus,
    seats
  ) => {
    if (newStatus === ogStatus) return;

    try {
      const response = await axios.put("/attendees/update-status", {
        attendeeId,
        status: newStatus,
        eventId: event._id,
        ogStatus: ogStatus,
        seats: seats,
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
    <div className="attendance-container">
      <div className="event-date">
        <h1>{convertDateReadability(event.date)}</h1>
      </div>
      {attendees.length > 0 ? (
        <div className="attendees-container">
          {attendees.map((attendee) => (
            <Attendee
              key={attendee._id}
              attendee={attendee}
              onStatusChange={updateAttendeeStatus}
              date={event.date}
            />
          ))}
        </div>
      ) : (
        <div className="no-attendees-container">
          <p>No attendees yet</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
