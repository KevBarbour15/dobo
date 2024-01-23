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
        <Link className="menu-link bold-text" to="/" onClick={onClose}>
          <p>HOME</p>
        </Link>
        <Link className="menu-link outlined-text" to="/About" onClick={onClose}>
          <p>ABOUT</p>
        </Link>
        <Link className="menu-link bold-text" to="/Attend" onClick={onClose}>
          <p>ATTEND</p>
        </Link>
        <Link
          className="menu-link outlined-text"
          to="/Contact"
          onClick={onClose}
        >
          <p>CONTACT</p>
        </Link>
        <Link className="menu-link bold-text" to="/Gallery" onClick={onClose}>
          <p>GALLERY</p>
        </Link>
      </div>
      <div className="invisible-div"></div>
    </div>
  );
};

export default Menu;
