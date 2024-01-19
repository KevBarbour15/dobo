import { useState } from "react";
import "./view-events.css";
import Modal from "../Modal/Modal.js";
import Attendance from "../Modal-Components/Attendance/Attendance.js";
import ViewNotes from "../Modal-Components/Notes/ViewNotes.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.js";

const EventDetailsPast = ({ event, onUpdateEvent }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleViewAttendance = () => {
    setModalContent(
      <Attendance
        event={event}
        onClose={() => setModalOpen(false)}
        eventTiming={"past"}
      />
    );
    setModalOpen(true);
  };

  const handleViewNotes = () => {
    setModalContent(
      <ViewNotes
        event={event}
        onUpdateEvent={() => onUpdateEvent(event._id)}
        onClose={() => setModalOpen(false)}
      />
    );
    setModalOpen(true);
  };

  return (
    <div className="events-card">
      <div className="event-details">
        <h2 className="event-title">{event.title}</h2>
        <p>{convertDateReadability(event.date)}</p>
        <p>{convertMilitaryTime(event.time)}</p>
        <p>Seats: {event.seats}</p>
        <p>Attendees: {event.seats - event.seatsRemaining}</p>
        <p>Price: ${event.price}</p>
      </div>
      <div className="event-options">
        <button className="button" type="button" onClick={handleViewAttendance}>
          Attendance
        </button>
        <button className="button" type="button" onClick={handleViewNotes}>
          Notes
        </button>
      </div>
      <Modal
        title={convertDateReadability(event.date)}
        isVisible={isModalOpen}
        onUpdateEvent={onUpdateEvent}
        onClose={() => setModalOpen(false)}
      >
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

const PastEvents = ({ events, onUpdateEvent }) => {
  const pastEvents = events.filter(
    (event) => new Date(event.date) < new Date()
  );

  return (
    <div className="event-form">
      <div className="events-list">
        {pastEvents.map((event) => (
          <EventDetailsPast
            key={event._id}
            event={event}
            onUpdateEvent={onUpdateEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default PastEvents;
