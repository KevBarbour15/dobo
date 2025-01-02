import "./home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// component imports
import Menu from "../../components/Menu/Menu.jsx";

// image imports
import D from "../../assets/images/logo-letters/D.png";
import O from "../../assets/images/logo-letters/O.png";
import B from "../../assets/images/logo-letters/B.png";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    const letters = gsap.utils.toArray(".home-logo");
    gsap.set(letters, { x: (i) => (i % 2 === 0 ? 15 : -15) });

    let tl = gsap.timeline({ delay: 0.25, ease: "sine.out" });
    tl.fromTo(
      ".home-header-menu",
      { opacity: 0 },
      { duration: 0.5, opacity: 1 },
      0.75
    )
      .to(letters, { opacity: 1, x: 0, stagger: 0.1, duration: 0.75 }, 0)
      .from(".home-text", { opacity: 0, duration: 0.25 }, 0.25)
      .from(".button-wrapper", { opacity: 0, duration: 0.25 }, 0.5);
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
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      <div className="home-container">
        <button
          onClick={toggleMenu}
          className={`home-menu-button ${isMenuOpen ? "open" : ""}`}
        >
          <span className="material-icons">menu</span>
        </button>

        <div className={`home-text-container ${isMenuOpen ? "open" : ""}`}>
          <div className="logo-wrapper">
            <img className="home-logo" src={D} alt="DOBO"></img>
            <img className="home-logo" src={O} alt="DOBO"></img>
            <img className="home-logo" src={B} alt="DOBO"></img>
            <img className="home-logo" src={O} alt="DOBO"></img>
          </div>
          <p className="home-text">
            Join us for a unique Filipino dining experience, featuring
            time-honored recipes elevated to new heights.
          </p>
          <div className="button-wrapper">
            <Link
              className="home-button"
              to="/attend"
              aria-label="Book a time to attend."
              role="button"
            >
              <span>Attend</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
