import "./home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu.js";
import logo from "../../assets/images/logo.png";

import useFadeIn from "../../animation-hooks/fadeIn.js";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useFadeIn(true, ".home-image-container", 1, 0);
  useFadeIn(true, ".home-text-container", 1, 25);
  useFadeIn(true, ".home-header-container", 1, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="home-container">
      <div className="home-image-container">
        <header className="home-header-container">
          <Menu isOpen={isMenuOpen} onClose={closeMenu} />
          <div className="home-header-menu-container">
            <div className="home-header-menu">
              <button
                onClick={toggleMenu}
                className={`home-menu-button ${isMenuOpen ? "open" : ""}`}
              >
                <span className="material-icons">menu</span>
              </button>
            </div>
          </div>

          <div className="home-header-title-container">
            <div
              className={`home-header-title ${isMenuOpen ? "open" : ""}`}
            ></div>
          </div>
          <div className="home-invisible-element"></div>
        </header>
        <div className={`home-text-container ${isMenuOpen ? "open" : ""}`}>
          <img className="home-logo" src={logo} alt="DOBO"></img>
          <Link className="home-button" to="/Attend">
            attend
          </Link>
        </div>
      </div>
      <div className="home-empty-footer"></div>
    </div>
  );
};

export default Home;
