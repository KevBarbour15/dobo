import "./menu.css";

import { Link } from "react-router-dom";

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <div>
        <button onClick={onClose} className="menu-close-button">
          <span className="material-icons">close</span>
        </button>
      </div>
      <div className="menu-links-container">
        <Link className="menu-link" to="/" onClick={onClose}>
          <span>HOME</span>
        </Link>
        <Link className="menu-link" to="/About" onClick={onClose}>
          <span>ABOUT</span>
        </Link>
        <Link className="menu-link" to="/Attend" onClick={onClose}>
          <span>ATTEND</span>
        </Link>
        <Link className="menu-link" to="/Gallery" onClick={onClose}>
          <span>GALLERY</span>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
