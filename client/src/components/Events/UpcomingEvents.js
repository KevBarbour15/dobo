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

import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.js";

import useFadeIn from "../../animation-hooks/fadeIn.js";

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
      <div className="event-info">
        <div className="event-title-container">
          <span className="event-title">{event.title}</span>
        </div>
        <div className="event-details-container">
          <div className="event-details">
            <span>- {convertDateReadability(event.date)}</span>
            <span>- {convertMilitaryTime(event.time)}</span>
            <span>- {event.seats} seats total</span>
            {event.seatsRemaining >= 0 ? (
              <span>- {event.seatsRemaining} seats left</span>
            ) : (
              <span className="negative-seats">
                - {event.seatsRemaining} seats available(Overbooked)
              </span>
            )}

            <span>- ${event.price}</span>
          </div>
        </div>
      </div>
      <div className="event-options">
        <div className="button-group upcoming">
          <button
            className="button event"
            type="button"
            onClick={handleViewAttendance}
          >
            <span>Attendance</span>
          </button>
          <button
            className="button event"
            type="button"
            onClick={handleViewNotes}
          >
            Notes
          </button>
          <button className="button event" type="button" onClick={handleEdit}>
            Edit
          </button>
          <button className="button event" type="button" onClick={handleDelete}>
            Cancel
          </button>
        </div>
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
  const futureEvents = filterAccessibleEventsNYC(events);

  useFadeIn(true, ".events-list", 0.5, 0.25);

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
