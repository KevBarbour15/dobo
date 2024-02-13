import { useState } from "react";
import "./view-events.css";
import Modal from "../Modal/Modal.js";
import Attendance from "../Modal-Components/Attendance/Attendance.js";
import ViewNotes from "../Modal-Components/Notes/ViewNotes.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.js";

import { filterPastEventsNYC } from "../../util/timeZoneFormatting.js";

import useFadeIn from "../../animation-hooks/fadeIn.js";

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
      <div className="event-info">
        <div className="event-title-container">
          <span className="event-title">{event.title}</span>
        </div>
        <div className="event-details-container">
          <span>- {convertDateReadability(event.date)}</span>
          <span>- {convertMilitaryTime(event.time)}</span>
          <span>- {event.seats} seats</span>

          <span>- {event.seats - event.seatsRemaining} attendees</span>

          <span>- ${event.price}</span>
        </div>
      </div>
      <div className="event-options">
        <div className="button-group past">
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
        </div>
      </div>
      <Modal
        title={convertDateReadability(event.date)}
        isVisible={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

const PastEvents = ({ events, onUpdateEvent }) => {
  const pastEvents = filterPastEventsNYC(events);

  useFadeIn(true, ".events-list", 0.5);

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
