import { useState } from "react";
import "./view-events.css";
import Modal from "../Modal/Modal.js";
import EditEvent from "../Modal-Components/EditEvent/EditEvent.js";
import Attendance from "../Modal-Components/Attendance/Attendance.js";
import Cancel from "../Modal-Components/CancelEvent/CancelEvent.js";
import ViewNotes from "../Modal-Components/Notes/ViewNotes.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.js";

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
      <Cancel
        event={event}
        onDeleteEvent={() => onDeleteEvent(event._id)}
        onClose={() => setModalOpen(false)}
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

  const handleViewAttendance = () => {
    setModalContent(
      <Attendance
        event={event}
        onUpdateEvent={() => onUpdateEvent(event._id)}
        onClose={() => setModalOpen(false)}
        eventTiming={"upcoming"}
      />
    );
    setModalOpen(true);
  };

  return (
    <div className="events-card">
      <div className="event-options">
        <button className="button" type="button" onClick={handleViewAttendance}>
          Attendance
        </button>
        <button className="button" type="button" onClick={handleViewNotes}>
          Notes
        </button>
        <button className="button" type="button" onClick={handleEdit}>
          Edit
        </button>
        <button className="button" type="button" onClick={handleDelete}>
          Cancel
        </button>
      </div>
      <div className="event-details">
        <p className="event-title">{event.title}</p>
        <p>{convertDateReadability(event.date)}</p>
        <p>{convertMilitaryTime(event.time)}</p>
        <p>Seats: {event.seats}</p>
        {event.seatsRemaining >= 0 ? (
          <p>Seats Available: {event.seatsRemaining}</p>
        ) : (
          <p className="negative-seats">
            Seats Available: {event.seatsRemaining} (Overbooked)
          </p>
        )}

        <p>Price: ${event.price}</p>
      </div>
      <Modal
        title={convertDateReadability(event.date)}
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
  );
};

export default UpcomingEvents;
