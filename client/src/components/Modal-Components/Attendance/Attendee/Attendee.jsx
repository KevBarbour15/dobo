import { useState, useEffect } from "react";
import "./attendee.scss";

import { Mail } from "lucide-react";

// helper function imports
import { convertDateReadability } from "../../../../util/formatting.jsx";

const Attendee = ({ attendee, onStatusChange, date, eventTiming, event }) => {
  const [status, setStatus] = useState(attendee.status);
  const [ogStatus, setOgStatus] = useState("");
  const [seats, setSeats] = useState(attendee.seats);
  const [ogSeats, setOgSeats] = useState("");
  const [winePairings, setWinePairings] = useState(attendee.winePairings || 0);
  const [ogWinePairings, setOgWinePairings] = useState("");

  useEffect(() => {
    console.log(attendee);
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

  const handleSave = () => {
    onStatusChange(attendee._id, status, ogStatus, seats, winePairings);
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
              }?subject=Dinner ${convertDateReadability(date)}`}
            >
              <Mail strokeWidth={1.25} color="black" size={24} />
            </a>
          </div>
          {attendee.message && (
            <div className="attendee-message">
              <p>{attendee.message ? `"` + attendee.message + `"` : ""}</p>
            </div>
          )}
          <select
            className="form-element"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Inquired">Inquired</option>
            <option value="Contacted">Contacted</option>
            <option value="Not Attending">Not Attending</option>
            <option value="Waitlisted">Waitlisted</option>
            <option value="Refunded">Refunded</option>
          </select>
          {status === "Confirmed" && (
            <>
              <select
                className="form-element"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              >
                {[...Array(Number(event.seatsRemaining))].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "seat" : "seats"}
                  </option>
                ))}
              </select>
              <select
                className="form-element"
                value={winePairings}
                onChange={(e) => setWinePairings(Number(e.target.value))}
              >
                <option value={0}>0 wine pairings</option>
                {[...Array(Number(seats))].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "wine pairing" : "wine pairings"}
                  </option>
                ))}
              </select>
            </>
          )}
          <button className="button" onClick={handleSave}>
            Update
          </button>
        </div>
      ) : (
        <div className="attendee-info">
          <div className="contact-icon">
            <span className="attendee-name">
              {attendee.firstName + " " + attendee.lastName}
            </span>
            <a
              className="item email"
              href={`mailto:${
                attendee.email
              }?subject=Dinner ${convertDateReadability(date)}`}
            >
              <Mail strokeWidth={1.25} color="black" size={24} />
            </a>
          </div>
          {attendee.message && (
            <div className="attendee-message">
              <p>{attendee.message ? `"` + attendee.message + `"` : ""}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendee;
