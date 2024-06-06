import "./home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// component imports
import Menu from "../../components/Menu/Menu.jsx";

// image imports
import logo from "../../assets/images/logo-cream.png";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useFadeIn(true, ".home-image-container", 1.25, 0);

  useGSAP(() => {
    let tl = gsap.timeline({ delay: 0.5, ease: "sine.inOut" });

    tl.from(
      ".home-header-menu",
      {
        duration: 1,
        opacity: 0,
      },
      0
    )
      .from(
        ".logo-wrapper",
        {
          duration: 0.85,
          opacity: 0,
          ease: "sine.inOut",
          x: -125,
        },
        0.15
      )
      .from(
        ".button-wrapper",
        {
          duration: 0.85,
          x: 125,
          opacity: 0,
          ease: "sine.inOut",
        },
        0.15
      );
  });

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
              ATTEND
            </Link>
          </div>
        </div>
      </div>
      <div className="home-empty-footer"></div>
    </div>
  );
};

export default Home;
