import React from "react";
import { convertDateReadability } from "../../helpers/formatting.js";

const Attendance = ({ event, onClose }) => {
  return (
    <div>
      <h1>Attendance for</h1>
      <h1>{convertDateReadability(event.date)}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Attendance;
