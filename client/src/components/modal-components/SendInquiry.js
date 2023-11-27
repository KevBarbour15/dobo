import React, { useState } from "react";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../helpers/formatting.js";
import axios from "../../axiosConfig";

const Inquiry = ({ events, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(events[0]?._id || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendeeData = {
      name,
      email,
      eventId: selectedEventId,
      status: "Pending",
    };

    try {
      const response = await axios.post("/attendees/new", attendeeData);
      if (response.status === 200 || response.status === 201) {
        console.log("Attendee created successfully!");
      } else {
        console.error("Error creating attendee:", response);
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
    onClose();
  };

  return (
    <div className="inquiry-form">
      <h1>Choose Date: </h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {convertDateReadability(event.date)} at{" "}
              {convertMilitaryTime(event.time)}
            </option>
          ))}
        </select>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Inquiry;
