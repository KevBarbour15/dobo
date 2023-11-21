import React from "react";
import { convertDateReadability } from "../../helpers/formatting.js";

const Delete = ({ event, onClose }) => {
  return (
    <div>
      <h1>Delete Event:</h1>
      <h1>{convertDateReadability(event.date)}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Delete;
