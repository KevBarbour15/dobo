import React, { useState, useEffect } from "react";
import "../styles/header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollDistance = 60;
      setIsScrolled(offset > scrollDistance);

      const sections = ["home", "about", "attend", "contact"];
      let maxVisibleHeight = 0;
      let currentSection = "home";

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          const visibleTop = Math.max(sectionTop, offset);
          const visibleBottom = Math.min(
            sectionTop + sectionHeight,
            offset + viewportHeight
          );
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (
            visibleHeight > maxVisibleHeight &&
            visibleHeight > viewportHeight / 2
          ) {
            maxVisibleHeight = visibleHeight;
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 92,
        behavior: "smooth",
      });
    }
  };

  const linkClass = (sectionId) => {
    return `link-container ${activeSection === sectionId ? "active-link" : ""}`;
  };

  return (
    <header
      className={`header-container ${isScrolled ? "header-scrolled" : ""}`}
    >
      <div
        onClick={() => scrollToSection("home")}
        className="header-title-container"
      >
        <div className="header-title">
          <h1>DOBO</h1>
        </div>
      </div>
      <div className="header-links-container">
        <div className="header-links">
          <nav>
            <nav>
              <div
                className={linkClass("about")}
                onClick={() => scrollToSection("about")}
              >
                <a>About</a>
              </div>
              <div
                className={linkClass("attend")}
                onClick={() => scrollToSection("attend")}
              >
                <a>Attend</a>
              </div>
              <div
                className={linkClass("contact")}
                onClick={() => scrollToSection("contact")}
              >
                <a>Contact</a>
              </div>
            </nav>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
