import { useState } from "react";
import "../styles/dash-header.css";

const DashHeader = ({ setActiveSection, onLogout, activeSection }) => {
  const linkClass = (sectionId) => {
    return `dash-link-container ${
      activeSection === sectionId ? "dash-active-link" : ""
    }`;
  };

  return (
    <div className="dash-header-container">
      <div className="dash-header-title-container">
        <div className="dash-header-title">
          <h1>Event Dashboard</h1>
        </div>
      </div>
      <div className="dash-header-links-container">
        <div className="dash-header-links">
          <nav>
            <div
              className={linkClass("create")}
              onClick={() => setActiveSection("create")}
            >
              <a>Create Event</a>
            </div>
            <div
              className={linkClass("view")}
              onClick={() => setActiveSection("view")}
            >
              <a>Upcoming Events</a>
            </div>
            <div className="dash-link-container">
              <a onClick={onLogout}>Logout</a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;