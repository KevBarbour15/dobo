import { useState } from "react";
import "./header.css";
import Menu from "../Menu/Menu.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header-container">
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      <div className="header-menu-container">
        <div className="header-menu">
          <button
            onClick={toggleMenu}
            className={`menu-button ${isMenuOpen ? "open" : ""}`}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
      <div className="header-title-container">
        <div className={`header-title ${isMenuOpen ? "open" : ""}`}>
          <h1>DOBO</h1>
        </div>
      </div>
      <div className="invisible-element"></div>
    </header>
  );
};

export default Header;
