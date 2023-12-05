import { useState } from "react";
import Modal from "./Modal.js";
import EditEvent from "./modal-components/Edit.js";
import Attendance from "./modal-components/Attendance.js";
import Delete from "./modal-components/Delete.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../helpers/formatting.js";

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
        <p>Seats: {event.seats}</p>
        <p>Seats Available: {event.seatsRemaining}</p>
        <p>Date: {convertDateReadability(event.date)}</p>
        <p>Time: {convertMilitaryTime(event.time)}</p>
      </div>
      <div className="event-options">
        <button type="button" onClick={handleViewAttendance}>
          Attendance
        </button>
        <button type="button" onClick={handleEdit}>
          Edit Event
        </button>
        <button type="button" onClick={handleDelete}>
          Delete Event
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

// TODO: Add a button to delete an event
// TODO: Add a button to edit an event ** maybe a modal?
// TODO: Email inquiry service
// TODO: Add a seat incrementer/decrementer for available events

const DisplayEvents = ({ events, onDeleteEvent, onUpdateEvent }) => (
  <div className="event-form">
    <h1>Upcoming Events</h1>
    <div className="events-list">
      {events.map((event) => (
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

export default DisplayEvents;
