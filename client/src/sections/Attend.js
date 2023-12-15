import { useState, useEffect } from "react";
import "../styles/attend.css";
import axios from "../axiosConfig.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../util/formatting.js";

import PhotoGallery from "../components/PhotoGallery.js";
import { photoArray2 } from "../assets/images/photoArrays.js";

const Attend = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sortedEvents);
      } catch (error) {}
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const firstEvent = events[0];
      setSelectedEventId(firstEvent._id);
      setDate(firstEvent.date);
    }
  }, [events]);

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEventId(eventId);
    const selectedEvent = events.find((event) => event._id === eventId);
    if (selectedEvent) {
      setDate(selectedEvent.date);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let convertedDate = convertDateReadability(date);
    const attendeeData = {
      name,
      email,
      eventId: selectedEventId,
      date: convertedDate,
      status: "Inquired/Not Attending",
      message,
    };

    try {
      const response = await axios.post("/attendees/new", attendeeData);
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
  };

  return (
    <div id="attend" className="attend-container">
      <div className="attend-left">
        <div className="image-container">
          <PhotoGallery photos={photoArray2} />
        </div>
      </div>
      <div className="attend-right">
        <div className="attend-info-container">
          <div className="attend-title">Attend</div>
          <div className="attend-text">
            To attend a Dobo dinner, please fill out the form below. We will
            reach out with details. Seating is limited.
          </div>

          <div className="inquiry-form">
            <form onSubmit={handleSubmit}>
              <select value={selectedEventId} onChange={handleEventChange}>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {convertDateReadability(event.date)} at{" "}
                    {convertMilitaryTime(event.time)}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={name}
                placeholder="NAME"
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                value={email}
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <textarea
                type="text"
                value={message}
                placeholder="MESSAGE (OPTIONAL)"
                onChange={(e) => setMessage(e.target.value)}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attend;
