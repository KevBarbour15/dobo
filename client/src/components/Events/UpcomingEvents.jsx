import { useState } from "react";
import "./view-events.scss";

// component imports
import Modal from "../Modal/Modal.jsx";
import EditEvent from "../Modal-Components/EditEvent/EditEvent.jsx";
import Attendance from "../Modal-Components/Attendance/Attendance.jsx";
import Cancel from "../Modal-Components/CancelEvent/CancelEvent.jsx";
import ViewNotes from "../Modal-Components/Notes/ViewNotes.jsx";

// helper function imports
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.jsx";
import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.jsx";

// animation imports
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
          <ul className="event-details">
            <li>
              <span>{convertDateReadability(event.date)}</span>
            </li>
            <li>
              <span>{convertMilitaryTime(event.time)}</span>
            </li>
            <li>
              <span>{event.seats} seats total</span>
            </li>
            {event.seatsRemaining >= 0 ? (
              <li>
                <span>{event.seatsRemaining} seats left</span>
              </li>
            ) : (
              <li>
                <span className="negative-seats">
                  {event.seatsRemaining} seats available (Overbooked)
                </span>
              </li>
            )}
            <li>
              <span>${event.price}</span>
            </li>
            <li>
              {event.isPublicEvent ? <span>Public</span> : <span>Private</span>}
            </li>
          </ul>
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
  const filterPublicEvents = false;
  const futureEvents = filterAccessibleEventsNYC(events, filterPublicEvents);

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
