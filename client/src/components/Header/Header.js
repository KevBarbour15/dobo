import { useState } from "react";
import "./header.css";
import Menu from "../Menu/Menu.js";
import logo from "../../assets/images/logo-black.png";

import useFadeIn from "../../animation-hooks/fadeIn.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useFadeIn(".header-title-container", 1);

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
      <div className={`header-title-container ${isMenuOpen ? "open" : ""}`}>
        <img className="header-title" src={logo} alt="DOBO" />
      </div>
      <div className="invisible-element"></div>
    </header>
  );
};

export default Header;
