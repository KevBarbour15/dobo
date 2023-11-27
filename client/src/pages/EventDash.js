import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import DisplayEvents from "../components/DisplayEvents";
import CreateEvent from "../components/CreateEvent";
import "../styles/eventDash.css";
import axios from "../axiosConfig";

const EventDash = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    axios
      .get("/events/get-all")
      .then((response) => {
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sortedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events: ", error);
      });
  }, [isAuthenticated, navigate]);

  const addNewEvent = (newEvent) => {
    setEvents(
      [...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div>
      <div className="events-container">
        <div className="create-div">
          <CreateEvent onEventCreated={addNewEvent} />
          <div className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="events-div">
          <DisplayEvents events={events} />
        </div>
      </div>
    </div>
  );
};

export default EventDash;
