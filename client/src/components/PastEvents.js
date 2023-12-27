import { useState } from "react";
import Modal from "./Modal.js";
import Attendance from "./modal-components/Attendance.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../util/formatting.js";
import "../styles/view-events.css";

const EventDetailsPast = ({ event }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleViewAttendance = () => {
    setModalContent(
      <Attendance event={event} onClose={() => setModalOpen(false)} />
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
        <p>Seats Available: {event.seatsRemaining}</p>
        <p>Price: ${event.price}</p>
      </div>
      <div className="event-options">
        <button type="button" onClick={handleViewAttendance}>
          Attendance
        </button>
      </div>
      <Modal isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

const PastEvents = ({ events }) => {
  const pastEvents = events.filter(
    (event) => new Date(event.date) < new Date()
  );

  return (
    <div className="event-form">
      <div className="events-list">
        {pastEvents.map((event) => (
          <EventDetailsPast key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default PastEvents;
