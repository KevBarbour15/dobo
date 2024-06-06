import "./home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// component imports
import Menu from "../../components/Menu/Menu.jsx";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

// image imports
import D from "../../assets/images/D.png";
import O from "../../assets/images/O.png";
import B from "../../assets/images/B.png";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useFadeIn(true, ".home-image-container", 1, 0);

  useGSAP(() => {
    const letters = gsap.utils.toArray(".home-logo");
    gsap.set(letters, { x: (i) => (i % 2 === 0 ? 125 : -125) });

    let tl = gsap.timeline({ delay: 0.5, ease: "linear" });
    tl.fromTo(
      ".home-header-menu",
      { opacity: 0 },
      { duration: 1, opacity: 1 },
      1.25
    )
      .to(letters, { opacity: 1, x: 0, stagger: 0.1, duration: 1 }, 0)
      .from(".button-wrapper", { opacity: 0, duration: 1 }, 1.25);
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
    <>
      <PageTransition />
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
              <img className="home-logo" src={D} alt="DOBO"></img>
              <img className="home-logo" src={O} alt="DOBO"></img>
              <img className="home-logo" src={B} alt="DOBO"></img>
              <img className="home-logo" src={O} alt="DOBO"></img>
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
    </>
  );
};

export default Home;
