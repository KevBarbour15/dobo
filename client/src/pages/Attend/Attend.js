import { useState, useEffect, useRef } from "react";
import "./attend.css";
import axios from "../../axiosConfig.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.js";

import img from "../../assets/images/dobo-12.jpg";

//import ImageContainer from "../../components/ImageContainer/ImageContainer.js";

import PageTitle from "../../components/PageTitle/PageTitle.js";

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
      } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error("There was an error fetching the data:", errorData);
      }
    };
    fetchEvents();
  }, []);

  const handleSelectChange = (e) => {
    const selectElement = e.target;
    const selectedEvent = futureEvents.find(
      (event) => event._id === e.target.value
    );

    if (selectedEvent) {
      setSelectedEventId(selectedEvent._id);
      setDate(selectedEvent.date);
      selectElement.classList.remove("default-option");
      selectElement.classList.add("select-option");
    } else {
      selectElement.classList.add("default-option");
      selectElement.classList.remove("select-option");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEventId) return;

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

  useEffect(() => {
    const selectElement = document.querySelector("select");
    if (selectElement && selectedEventId === "") {
      selectElement.classList.add("default-");
    }
  }, []);

  return (
    <div id="attend" className="attend-container">
      <div className="attend-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="attend-right">
        <PageTitle title={"attend"} />
        <div className="attend-info-container">
          <div className="attend-text">
            Please fill out the form below to attend. We will reach out with
            details. Seating is limited.
          </div>

          <div className="inquiry-form">
            <form onSubmit={handleSubmit}>
              <select
                className="form-element"
                value={selectedEventId}
                onChange={handleSelectChange}
              >
                <option className="default-option" value="" disabled hidden>
                  select a date
                </option>
                {futureEvents.map((event) => (
                  <option
                    className="selected-option"
                    key={event._id}
                    value={event._id}
                  >
                    {convertDateReadability(event.date)} at{" "}
                    {event.seatsRemaining > 0
                      ? convertMilitaryTime(event.time)
                      : "SOLD OUT"}
                  </option>
                ))}
              </select>
              <input
                className="form-element"
                type="text"
                value={name}
                placeholder="name:"
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="form-element"
                type="email"
                value={email}
                placeholder="email:"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <textarea
                className="form-element"
                type="text"
                value={message}
                placeholder="message (optional):"
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="button" type="submit">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attend;
