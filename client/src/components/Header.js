import React, { useState, useEffect } from "react";
import "../styles/header.css";
import Logo from "../assets/images/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const scrollDistance = 60;
      setIsScrolled(offset > scrollDistance);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header-container ${isScrolled ? "header-scrolled" : ""}`}
    >
      <div className="header-title-container">
        <div className="header-title">
          <h1>DOBO</h1>
        </div>
      </div>
      <div className="header-links-container">
        <div className="header-links">
          <nav>
            <div className="link-container">
              <a href="#home">Home</a>
            </div>
            <div className="link-container">
              <a href="#about">About</a>
            </div>
            <div className="link-container">
              <a href="#attend">Attend</a>
            </div>
            <div className="link-container">
              <a href="#contact">Contact</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
