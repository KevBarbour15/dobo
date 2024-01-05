import React, { useState } from "react";
import "./header.css";
import Menu from "../Menu/Menu.js";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      <div className="header-title-container">
        <div className="header-title">
          <h1>DOBO</h1>
        </div>
      </div>
      <div className="invisible-element"></div>
    </header>
  );
};

export default Header;
