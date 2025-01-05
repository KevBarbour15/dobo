import { useState } from "react";
import "./header.scss";

// component imports
import Menu from "../Menu/Menu.jsx";

// image imports
import logo from "../../assets/images/logo-black.png";

import { Menu as MenuIcon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      <header className="header-container">
        <div className="header-menu">
          <button
            onClick={toggleMenu}
            className={`menu-button ${isMenuOpen ? "open" : ""}`}
          >
            <MenuIcon size={24} strokeWidth={1.25} />
          </button>
        </div>

        <img className="header-title" src={logo} alt="DOBO" />
      </header>
    </>
  );
};

export default Header;
