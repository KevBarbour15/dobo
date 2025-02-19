import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./header.scss";

// component imports
import Menu from "../Menu/Menu.jsx";

// image imports
import logo from "../../assets/images/logo-black.png";
import { Menu as MenuIcon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Define routes where the logo should be shown
    const routesToDisplayLogo = ["/gallery", "/success"];
    const shouldShowLogo = routesToDisplayLogo.includes(location.pathname);
    setShowHeaderLogo(shouldShowLogo);
  }, [location.pathname]);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      <header className="header-container">
        <div className="header-menu">
          <button
            onClick={toggleMenu}
            className={`menu-button ${isMenuOpen ? "open" : ""}`}
          >
            <MenuIcon size={28} strokeWidth={2.25} />
          </button>
        </div>
        {showHeaderLogo && (
          <Link to="/" aria-label="DOBO">
            <img className="header-logo" src={logo} alt="DOBO" />
          </Link>
        )}
      </header>
    </>
  );
};

export default Header;
