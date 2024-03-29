import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "../../axiosConfig";

import DashHeader from "../../components/DashHeader/DashHeader.js";
import UpcomingEvents from "../../components/Events/UpcomingEvents.js";
import PastEvents from "../../components/Events/PastEvents.js";
import CreateEvent from "../../components/CreateEvent/CreateEvent.js";
import "./event-dash.css";

const EventDash = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [activeSection, setActiveSection] = useState("create");

  const fetchEvents = () => {
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
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Attend");
    }
    fetchEvents();
  }, [isAuthenticated, navigate]);

  const addNewEvent = (newEvent) => {
    setEvents(
      [...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  };

  const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event._id === updatedEvent._id ? { ...updatedEvent } : event
    );
    setEvents([...updatedEvents]);
    fetchEvents();
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event._id !== eventId));
  };

  const handleLogout = () => {
    navigate("/Attend");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="dash-container">
      <DashHeader
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
        activeSection={activeSection}
      />
      <div className="events-container">
        {activeSection === "create" && (
          <div className="create-container">
            <CreateEvent onEventCreated={addNewEvent} />
          </div>
        )}
        {activeSection === "view" && (
          <div className="view-container">
            <UpcomingEvents
              events={events}
              onUpdateEvent={updateEvent}
              onDeleteEvent={deleteEvent}
            />
          </div>
        )}
        {activeSection === "past" && (
          <div className="view-container">
            <PastEvents events={events} onUpdateEvent={updateEvent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDash;
