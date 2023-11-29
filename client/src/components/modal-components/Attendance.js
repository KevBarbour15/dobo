import React, { useEffect, useState} from "react";
import { convertDateReadability } from "../../helpers/formatting.js";
import axios from "../../axiosConfig";
import Attendee from "../Attendee.js";

const Attendance = ({ event, onClose }) => {
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
    if(newStatus === ogStatus) return;

    console.log("updateAttendeeStatus: ", attendeeId," ", newStatus, " ", ogStatus);
    try {
      await axios.put("/attendees/update-status", {
        attendeeId,
        status: newStatus,
        eventId: event._id,
      });

      setAttendees(attendees.map(attendee => 
        attendee._id === attendeeId ? { ...attendee, status: newStatus } : attendee
      ));
    } catch (error) {
      console.error("Error updating attendee status: ", error);
    }
  };

  return (
    <div>
      <h1>{convertDateReadability(event.date)}</h1>
      {attendees.map((attendee) => (
        <Attendee key={attendee._id} attendee={attendee} onStatusChange={updateAttendeeStatus} />
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Attendance;
