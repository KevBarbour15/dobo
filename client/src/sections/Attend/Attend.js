import { useState, useEffect } from "react";
import "./attend.css";
import axios from "../../axiosConfig.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.js";

import PhotoGallery from "../../components/PhotoGallery/PhotoGallery.js";
import { photoArray2 } from "../../assets/images/photoArrays.js";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

const Attend = () => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        const futureEvents = sortedEvents.filter(
          (event) => new Date(event.date) > new Date()
        );
        setFutureEvents(futureEvents);
      } catch (error) {}
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (futureEvents.length > 0) {
      const firstEvent = futureEvents[0];
      setSelectedEventId(firstEvent._id);
      setDate(firstEvent.date);
    }
  }, [futureEvents]);

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEventId(eventId);
    const selectedEvent = futureEvents.find((event) => event._id === eventId);
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
      status: "Inquired",
      message,
    };

    try {
      const response = await axios.post("/attendees/new", attendeeData);
      if (response.status === 200 || response.status === 201) {
        setName("");
        setEmail("");
        setSelectedEventId("");
        setDate("");
        setMessage("");
        showSuccessNotification(enqueueSnackbar, "Thank you for your inquiry");
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
  };

  // add "select a date as a placeholder for the date input"

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
                {futureEvents.map((event) => (
                  <option key={event._id} value={event._id}>
                    {convertDateReadability(event.date)} at{" "}
                    {convertMilitaryTime(event.time)}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <textarea
                type="text"
                value={message}
                placeholder="Message (Optional)"
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
