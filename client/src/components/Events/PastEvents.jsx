import { useState } from "react";
import "./view-events.scss";

// component imports
import Modal from "../Modal/Modal.jsx";
import Attendance from "../Modal-Components/Attendance/Attendance.jsx";
import ViewNotes from "../Modal-Components/Notes/ViewNotes.jsx";

// helper function imports
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.jsx";
import { filterPastEventsNYC } from "../../util/timeZoneFormatting.jsx";

// animation imports


const EventDetailsPast = ({ event, onUpdateEvent }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
        eventTiming={"past"}
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
              <span>- {convertDateReadability(event.date)}</span>
            </li>
            <li>
              <span>- {convertMilitaryTime(event.time)}</span>
            </li>
            <li>
              <span>- {event.seats} seats</span>
            </li>
            <li>
              <span>- {event.seats - event.seatsRemaining} attendees</span>
            </li>
            <li>
              <span>- Event price: ${event.price}</span>
            </li>
            <li>
              <span>- Total payment: ${event.totalPayment || 0}</span>
            </li>
          </ul>
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
  // do not filter out public/private events
  const filterPublicEvents = false;
  const pastEvents = filterPastEventsNYC(events, filterPublicEvents);



  return (
    <div className="events-list">
      {pastEvents.map((event) => (
        <EventDetailsPast
          key={event._id}
          event={event}
          onUpdateEvent={onUpdateEvent}
        />
      ))}
    </div>
  );
};

export default PastEvents;
