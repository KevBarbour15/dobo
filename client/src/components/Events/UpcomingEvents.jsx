import { useState, useEffect } from "react";
import "./view-events.scss";

// component imports
import Modal from "../Modal/Modal.jsx";
import EditEvent from "../Modal-Components/EditEvent/EditEvent.jsx";
import Attendance from "../Modal-Components/Attendance/Attendance.jsx";
import AddGuest from "../Modal-Components/AddGuest/AddGuest.jsx";
import ViewNotes from "../Modal-Components/Notes/ViewNotes.jsx";

import { Check, CircleX } from "lucide-react";

// helper function imports
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.jsx";
import { filterAccessibleEventsNYC } from "../../util/timeZoneFormatting.jsx";

// animation imports

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

  const handleAddGuest = () => {
    setModalContent(
      <AddGuest
        event={event}
        onUpdateEvent={() => onUpdateEvent(event._id)}
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
              <span>- Date: {convertDateReadability(event.date)}</span>
            </li>
            <li>
              <span>- Time: {convertMilitaryTime(event.time)}</span>
            </li>
            <li>
              <span>- Seats: {event.seats} </span>
            </li>
            {event.seatsRemaining >= 0 ? (
              <li>
                <span>
                  - Seats filled: {event.seats - event.seatsRemaining}
                </span>
              </li>
            ) : (
              <li>
                <span className="negative-seats">
                  - Seats available: {event.seatsRemaining} (Overbooked)
                </span>
              </li>
            )}
            <li>
              <span>- Wine pairings: {event.winePairings || 0}</span>
            </li>
            <li>
              <span>- Event price: ${event.price}</span>
            </li>
            <li>
              <span>- Total payment: ${event.totalPayment || 0}</span>
            </li>
            <li>
              {event.isPublicEvent ? (
                <span className="flex gap-2 items-center">
                  - Event is posted. <Check size={24} strokeWidth={1.25} />
                </span>
              ) : (
                <span className="flex gap-2 items-center">
                  - Event is not posted.{" "}
                  <CircleX size={24} strokeWidth={1.25} />
                </span>
              )}
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
            onClick={handleAddGuest}
          >
            Add Guest
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
