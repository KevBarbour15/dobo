import { useState, useEffect } from "react";
import "../styles/attendee.css";

const Attendee = ({ attendee, onStatusChange }) => {
  const [status, setStatus] = useState(attendee.status);
  const [ogStatus, setOgStatus] = useState("");

  useEffect(() => {
    setOgStatus(attendee.status);
  }, [attendee.status]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    onStatusChange(attendee._id, status, ogStatus);
  };

  return (
    <div className="attendee-container">
      <div className="attendee-info">
        <p>{attendee.name}</p>
        <p>{attendee.email}</p>
        <p>Message: {attendee.message}</p>
        <select value={status} onChange={handleStatusChange}>
          <option value="Confirmed">Confirmed</option>
          <option value="Inquired/Not Attending">
            Inquired / Not Attending
          </option>
        </select>
      </div>
      <button onClick={handleSave}>Update</button>
    </div>
  );
};

export default Attendee;
