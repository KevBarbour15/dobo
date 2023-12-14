import { useState, useEffect } from "react";
import "../styles/attend.css";
import axios from "../axiosConfig.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../util/formatting.js";
import attendImage from "../assets/images/dobo-vertical-2.png";

const Attend = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [date, setDate] = useState("");

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
        <div className="attend-image-container">
          <img className="attend-image" src={attendImage}></img>
        </div>
      </div>
      <div className="attend-right">
        <div className="attend-info-container">
          <div className="attend-info-text">
            <h2>Attend</h2>
            <p>
              To attend a DOBO event, please fill out the form below. We will
              reach out shortly with details.
            </p>
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

              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attend;
