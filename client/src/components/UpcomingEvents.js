import { useState } from "react";
import Modal from "./Modal.js";
import EditEvent from "./modal-components/Edit.js";
import Attendance from "./modal-components/Attendance.js";
import Delete from "./modal-components/CancelEvent.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../util/formatting.js";
import "../styles/view-events.css";

const EventDetails = ({ event, onDeleteEvent, onUpdateEvent }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleEdit = () => {
    setModalContent(
      <EditEvent
        event={event}
        onUpdateEvent={() => onUpdateEvent(event._id)}
        onClose={() => setModalOpen(false)}
      />
    );
    setModalOpen(true);
  };

  const handleDelete = () => {
    setModalContent(
      <Delete
        event={event}
        onDeleteEvent={() => onDeleteEvent(event._id)}
        onClose={() => setModalOpen(false)}
      />
    );
    setModalOpen(true);
  };

  const handleViewAttendance = () => {
    setModalContent(
      <Attendance
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
        <p>Seats Available: {event.seatsRemaining}</p>
        <p>Price: ${event.price}</p>
      </div>
      <div className="event-options">
        <button type="button" onClick={handleViewAttendance}>
          Attendance
        </button>
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" onClick={handleDelete}>
          Cancel
        </button>
      </div>
      <Modal
        isVisible={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDeleteEvent={onDeleteEvent}
        onUpdateEvent={onUpdateEvent}
      >
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

const UpcomingEvents = ({ events, onDeleteEvent, onUpdateEvent }) => {
  const futureEvents = events.filter(
    (event) => new Date(event.date) > new Date()
  );

  return (
    <div className="event-form">
      <div className="events-list">
        {futureEvents.map((event) => (
          <EventDetails
            key={event._id}
            event={event}
            onDeleteEvent={onDeleteEvent}
            onUpdateEvent={onUpdateEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;