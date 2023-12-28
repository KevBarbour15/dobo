import { useState, useEffect } from "react";
import "./attendee.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { convertDateReadability } from "../../../../util/formatting.js";

const Attendee = ({ attendee, onStatusChange, date }) => {
  const [status, setStatus] = useState(attendee.status);
  const [seats, setSeats] = useState(attendee.seats);
  const [ogStatus, setOgStatus] = useState("");

  useEffect(() => {
    setOgStatus(attendee.status);
  }, [attendee.status]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSeatsChange = (e) => {
    setSeats(e.target.value);
  };

  const handleSave = () => {
    onStatusChange(attendee._id, status, ogStatus, seats);
  };

  return (
    <div className="attendee-container">
      <div className="attendee-info">
        <p>{attendee.name}</p>
        <a
          className="attendee-email"
          href={`mailto:${attendee.email}?subject=Dobo ${convertDateReadability(
            date
          )}`}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <p>Message: {attendee.message}</p>
        <select value={status} onChange={handleStatusChange}>
          <option value="Confirmed">Confirmed</option>
          <option value="Inquired">Inquired</option>
          <option value="Contacted">Contacted</option>
          <option value="Not Attending">Not Attending</option>
        </select>
        <select value={seats} onChange={handleSeatsChange}>
          <option value="0">0 Seats</option>
          <option value="1">1 Seat</option>
          <option value="2">2 Seats</option>
          <option value="3">3 Seats</option>
          <option value="4">4 Seats</option>
          <option value="5">5 Seats</option>
          <option value="6">6 Seats</option>
          <option value="7">7 Seats</option>
          <option value="8">8 Seats</option>
        </select>
      </div>
      <button onClick={handleSave}>Update</button>
    </div>
  );
};

export default Attendee;
