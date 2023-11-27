import React from "react";
import "../styles/attendee.css";

const Attendee = ({ attendee, onStatusChange }) => {
  return (
    <div className="attendee-container">
      <h2>{attendee.name}</h2>
      <h3>{attendee.email}</h3>
      <p>Status: {attendee.status}</p>
    </div>
  );
};

export default Attendee;
