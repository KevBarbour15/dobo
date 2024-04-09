import { useEffect, useState } from "react";
import "./attendance.css";

// component imports
import axios from "../../../axiosConfig.jsx";
import Attendee from "./Attendee/Attendee.jsx";
import Loading from "../Loading/Loading.jsx";

const Attendance = ({ event, onUpdateEvent, eventTiming }) => {
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false);
  const minLoadingTime = 1000;

  useEffect(() => {
    let timer = null;

    const fetchAttendees = async () => {
      try {
        const response = await axios.post("/attendees/get-by-ids", {
          eventId: event._id,
          attendeeIds: event.attendees,
        });

        setAttendees(response.data);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (event && event.attendees) {
      fetchAttendees();
    }

    timer = setTimeout(() => {
      setMinLoadTimePassed(true);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [event, minLoadingTime]);

  const shouldDisplayLoading = isLoading || !minLoadTimePassed;

  const updateAttendeeStatus = async (
    attendeeId,
    newStatus,
    ogStatus,
    seats
  ) => {
    if (newStatus === ogStatus && newStatus !== "Confirmed") return;

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
            ? { ...attendee, status: newStatus, seats: seats }
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
      {shouldDisplayLoading ? (
        <Loading />
      ) : (
        <>
          {attendees.length > 0 ? (
            <div
              className={`attendees-container ${
                !shouldDisplayLoading ? "visible" : ""
              }`}
            >
              {attendees.map((attendee) => (
                <Attendee
                  key={attendee._id}
                  attendee={attendee}
                  onStatusChange={updateAttendeeStatus}
                  date={event.date}
                  eventTiming={eventTiming}
                  event={event}
                />
              ))}
            </div>
          ) : (
            <div className="no-attendees-container">
              <p>No Attendees Yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Attendance;
