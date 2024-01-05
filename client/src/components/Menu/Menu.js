import "./menu.css";
import { Link } from "react-router-dom";

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <div>
        <button onClick={onClose} className="menu-close-button">
          X
        </button>
      </div>
      <div className="menu-links-container">
        <Link className="menu-link bold-text" to="/" onClick={onClose}>
          <p>HOME</p>
        </Link>
        <Link className="menu-link outlined-text" to="/about" onClick={onClose}>
          <p>ABOUT</p>
        </Link>
        <Link className="menu-link bold-text" to="/attend" onClick={onClose}>
          <p>ATTEND</p>
        </Link>
        <Link className="menu-link outlined-text rotated-text" to="/contact" onClick={onClose}>
          <p>CONTACT</p>
        </Link>
        <Link className="menu-link bold-text" onClick={onClose}>
          <p>GALLERY</p>
        </Link>
      </div>
      <div className="invisible-div"></div>
    </div>
  );
};

export default Menu;
