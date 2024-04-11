import "./home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// component imports
import Menu from "../../components/Menu/Menu.jsx";

// image imports
import logo from "../../assets/images/logo-cream.png";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn.js";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useFadeIn(true, ".home-header-menu", 0.5, 0.25, -5, 0);
  useFadeIn(true, ".logo-wrapper", 0.5, 0.25, 25);
  useFadeIn(true, ".button-wrapper", 0.5, 0.5, 25);

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
        </header>
        <div className={`home-text-container ${isMenuOpen ? "open" : ""}`}>
          <div className="logo-wrapper">
            <img className="home-logo" src={logo} alt="DOBO"></img>
          </div>
          <div className="button-wrapper">
            <Link className="home-button" to="/Attend">
              attend
            </Link>
          </div>
        </div>
      </div>
      <div className="home-empty-footer"></div>
    </div>
  );
};

export default Home;
