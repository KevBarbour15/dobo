import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/attend.css";
import axios from "../axiosConfig";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../util/formatting.js";

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
      } catch (error) {
      }
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
      if (response.status === 200 || response.status === 201) {
        console.log("Attendee created successfully!");
      } else {
        console.error("Error creating attendee:", response);
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
  };

  return (
    <div>
      <Layout>
        <div className="attend-container">
          <div className="attend-left">
            <div className="attend-info-container">
              <div className="attend-form-container">
                <div className="attend-form-text">
                  To learn how you can attend a DOBO event, please fill out the
                  form below with the date you wish to attend. We will reach out
                  to with details on how to attend.
                </div>
                <div className="inquiry-form">
                  <form onSubmit={handleSubmit}>
                    <select
                      value={selectedEventId}
                      onChange={handleEventChange}
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
                    <button type="submit">Confirm</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="attend-right">
            <div className="attend-image-container">
              {/* no image goes here */}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Attend;
