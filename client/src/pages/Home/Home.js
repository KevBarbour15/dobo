import "./home.css";
import { useState, useEffect } from "react";
import Menu from "../../components/Menu/Menu.js";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState(getNewYorkDate());

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  function getNewYorkDate() {
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/New_York",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    };

    const now = new Date();
    const date = now.toLocaleDateString("en-US", optionsDate);
    const time = now.toLocaleTimeString("en-US", optionsTime);

    return `${date}, ${time}`;
  }

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
        {/* background image */}
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
            <div className={`home-header-title ${isMenuOpen ? "open" : ""}`}>
              {/*<h1>brooklyn, nyc</h1>*/}
            </div>
          </div>

          <div className="home-invisible-element"></div>
        </header>
        <div className={`home-text-container ${isMenuOpen ? "open" : ""}`}>
          <h1 className="text-left">brooklyn, nyc</h1>
          <h1 className="text-right">{time}</h1>
        </div>
      </div>
      <div className="home-empty-footer"></div>
    </div>
  );
};

export default Home;
