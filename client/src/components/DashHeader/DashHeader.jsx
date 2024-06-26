import "./dash-header.scss";

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
          <span>Dashboard</span>
        </div>
      </div>
      <div className="dash-header-links-container">
        <div className="dash-header-links">
          <nav>
            <div
              className={linkClass("create")}
              onClick={() => setActiveSection("create")}
            >
              <button>NEW</button>
            </div>
            <div
              className={linkClass("view")}
              onClick={() => setActiveSection("view")}
            >
              <button>UPCOMING</button>
            </div>
            <div
              className={linkClass("past")}
              onClick={() => setActiveSection("past")}
            >
              <button>PAST</button>
            </div>
            <div className="dash-link-container" onClick={onLogout}>
              <button>LOGOUT</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
