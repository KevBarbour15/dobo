import React, { useState, useEffect } from "react";
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
      <h1>{attendee.name}</h1>
      <h2>{attendee.email}</h2>
      <select value={status} onChange={handleStatusChange}>
        <option value="Confirmed">Confirmed</option>
        <option value="Inquired/Not Attending">Inquired/Not Attending</option>
      </select>
      <button onClick={handleSave}>Update</button>
    </div>
  );
};

export default Attendee;
