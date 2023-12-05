import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/attend.css";
import axios from "../axiosConfig";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../helpers/formatting.js";

const Attend = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sortedEvents);
        console.log("Events fetched successfully!");
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setSelectedEventId(events[0]?._id || "");
  }, [events]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("selectedEventId: ", selectedEventId);
    const attendeeData = {
      name,
      email,
      eventId: selectedEventId,
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
                  form below with the date you wish to attend. We will reach out to with details on how to attend.
                </div>
                <div className="inquiry-form">
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
