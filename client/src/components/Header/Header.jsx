import { useState } from "react";
import "./header.scss";

// component imports
import Menu from "../Menu/Menu.jsx";

// image imports
import logo from "../../assets/images/logo-black.png";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    let tl = gsap.timeline({ delay: 0.05, ease: "sine.outOut" });

    tl.from(
      ".header-container",
      {
        delay: 0.25,
        opacity: 0,
        duration: 0.75,
        ease: "sine.outOut",
      },
      0
    );
  });

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
