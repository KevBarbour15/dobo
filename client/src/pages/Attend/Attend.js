import { useState, useEffect, useRef } from "react";
import "./attend.css";
import axios from "../../axiosConfig.js";
import {
  convertDateReadability,
  convertMilitaryTime,
} from "../../util/formatting.js";

import img from "../../assets/images/dobo-3.jpg";

import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

const Attend = () => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleDropdownToggle = () => {
    if (futureEvents.length > 0) {
      setShowDropdown(!showDropdown);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEventId(event._id);
    setDate(event.date);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const dropdownRef = useRef(null);

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

  const getDisplayValue = () => {
    if (selectedEventId) {
      const selectedEvent = futureEvents.find(
        (event) => event._id === selectedEventId
      );
      if (selectedEvent) {
        return `${convertDateReadability(
          selectedEvent.date
        )} at ${convertMilitaryTime(selectedEvent.time)}`;
      }
    }
    return "Select a date: ";
  };

  // need to have it compare time to new york time
  return (
    <div id="attend" className="attend-container">
      <div className="attend-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="attend-right">
        <div className="attend-title-container">
          <div className="attend-title-img">{/* placeholder */}</div>
          <div className="attend-title">attend</div>
        </div>
        <div className="attend-info-container">
          <div className="attend-text">
            To attend Dobo, please fill out the form below. We will reach out
            with details. Seating is limited.
          </div>

          <div className="inquiry-form">
            <form onSubmit={handleSubmit}>
              <div
                ref={dropdownRef}
                className="custom-dropdown"
                onClick={handleDropdownToggle}
              >
                <div className="dropdown-selected-value">
                  {getDisplayValue()}
                </div>
                {showDropdown && (
                  <div className="dropdown-list">
                    {futureEvents.map((event) => (
                      <div
                        key={event._id}
                        className="dropdown-list-item"
                        onClick={() => handleSelectEvent(event)}
                      >
                        {convertDateReadability(event.date)} at{" "}
                        {convertMilitaryTime(event.time)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

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

              <button className="button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attend;
