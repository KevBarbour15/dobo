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
          <div className="event-title">
            <span>{event.title}</span>
          </div>
          <div className="event-details">
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
        </div>
        <div className="event-options">
          <div className="button-group">
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
