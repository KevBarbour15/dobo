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

  const generateSeats = () => {
    let options = [];
    for (let i = 1; i <= event.seatsRemaining; i++) {
      options.push(
        <option value={i}>{`${i} Seat${i !== 1 ? "s" : ""}`}</option>
      );
    }
    return options;
  };

  const handleSave = () => {
    console.log("Seats: ", seats);
    onStatusChange(attendee._id, status, ogStatus, seats);
  };

  return (
    <div className="attendee-container">
      {eventTiming === "upcoming" ? (
        <div className="attendee-info">
          <p>{attendee.name}</p>
          <a
            className="attendee-email"
            href={`mailto:${
              attendee.email
            }?subject=Dobo ${convertDateReadability(date)}`}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <div className="attendee-message">
            <p>{attendee.message ? "- " + attendee.message : ""}</p>
          </div>
          <select value={status} onChange={handleStatusChange}>
            <option value="Confirmed">Confirmed</option>
            <option value="Inquired">Inquired</option>
            <option value="Contacted">Contacted</option>
            <option value="Not Attending">Not Attending</option>
          </select>
          {status === "Confirmed" && (
            <select value={seats} onChange={handleSeatsChange}>
              {console.log("Seats: ", seats)}
              {generateSeats()}
            </select>
          )}
          <button className="button" onClick={handleSave}>Update</button>
        </div>
      ) : attendee.status === "Confirmed" ? (
        <div className="attendee-info">
          <p>{attendee.name}</p>
          <a
            className="attendee-email"
            href={`mailto:${
              attendee.email
            }?subject=Dobo ${convertDateReadability(date)}`}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
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
