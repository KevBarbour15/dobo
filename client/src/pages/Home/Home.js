import "./home.css";
import { useState } from "react";
import Menu from "../../components/Menu/Menu.js";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
              <h1>DOBO</h1>
            </div>
          </div>

          <div className="home-invisible-element"></div>
        </header>
      </div>
    </div>
  );
};

export default Home;
