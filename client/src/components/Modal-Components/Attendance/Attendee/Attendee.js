import { useState, useEffect } from "react";
import "./attendee.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { convertDateReadability } from "../../../../util/formatting.js";

const Attendee = ({ attendee, onStatusChange, date, eventTiming, event }) => {
  const [status, setStatus] = useState(attendee.status);
  const [seats, setSeats] = useState(attendee.seats);
  const [ogStatus, setOgStatus] = useState("");

  useEffect(() => {
    setOgStatus(attendee.status);
    setSeats(attendee.seats);
  }, [attendee.status, attendee.seats, event]);

  useEffect(() => {
    if (status !== "Confirmed") {
      setSeats(0);
    }
  }, [event.seatsRemaining, status]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (newStatus === "Confirmed" && seats === 0) {
      setSeats(1);
    }

    if (newStatus !== "Confirmed") {
      setSeats(0);
    }
  };

  const handleSeatsChange = (e) => {
    setSeats(e.target.value);
  };


  const handleSave = () => {
    console.log("Seats: ", seats);
    onStatusChange(attendee._id, status, ogStatus, seats);
  };

  return (
    <div className="attendee-container">
      {eventTiming === "upcoming" ? (
        <div className="attendee-info">
          <div className="contact-icon">
            <span className="attendee-name">
              {attendee.firstName + " " + attendee.lastName}
            </span>
            <a
              className="item email"
              href={`mailto:${
                attendee.email
              }?subject=Dobo ${convertDateReadability(date)}`}
            >
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </a>
          </div>
          <div className="attendee-message">
            <p>{attendee.message ? `"` + attendee.message + `"` : ""}</p>
          </div>
          <select
            className="form-element"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Inquired">Inquired</option>
            <option value="Contacted">Contacted</option>
            <option value="Not Attending">Not Attending</option>
          </select>
          {status === "Confirmed" && (
            <select
              className="form-element"
              value={seats}
              onChange={handleSeatsChange}
            >
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          )}
          <button className="button" onClick={handleSave}>
            Update
          </button>
        </div>
      ) : attendee.status === "Confirmed" ? (
        <div className="attendee-info">
          <div className="contact-icon">
            <p className="attendee-name">{attendee.name}</p>
            <a
              className="item email"
              href={`mailto:${
                attendee.email
              }?subject=Dobo ${convertDateReadability(date)}`}
            >
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </a>
            </div>
          <p>Seats: {attendee.seats}</p>
        </div>
      ) : (
        // Render "No Attendees" if not confirmed
        <p>No Attendees</p>
      )}
    </div>
  );
};

export default Attendee;
