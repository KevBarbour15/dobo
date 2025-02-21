import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./header.scss";

// component imports
import Menu from "../Menu/Menu.jsx";

// image imports
import logo from "../../assets/images/logo-black.png";
import { Menu as MenuIcon } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Header = () => {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const [color, setColor] = useState("");
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useGSAP(() => {
    if (!containerRef.current || location.pathname === "/") return;

    ScrollTrigger.create({
      trigger: ".splash-image",
      start: "bottom bottom",
      end: "bottom top+=28",
      scrub: true,
      onUpdate: (self) => {
        setColor(self.progress === 1 ? "black" : "#f2f1f0");
      },
    });

    if (location.pathname === "/gallery") {
      setColor("black");
      let scrollTL = gsap.timeline();

      scrollTL.to(".header-logo", {
        scrollTrigger: {
          trigger: ".header-logo",
          start: "top top",
          end: "bottom top",
          scrub: true,
          onEnter: () => {
            gsap.to(".header-logo", {
              filter: "invert(1)",
              duration: 0.5,
            });
            setColor("#f2f1f0");
          },
          onLeaveBack: () => {
            gsap.to(".header-logo", {
              filter: "invert(0)",
              duration: 0.15,
            });
            setColor("black");
          },
        },
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    // Define routes where the logo should be shown
    const routesToDisplayLogo = ["/gallery", "/success"];
    const shouldShowLogo = routesToDisplayLogo.includes(location.pathname);
    setShowHeaderLogo(shouldShowLogo);

    // Set initial color based on route
    if (location.pathname === "/gallery") {
      setColor("black");
    } else {
      setColor("#f2f1f0");
    }
  }, [location.pathname]);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      <header ref={containerRef} className="header-container">
        <div className="header-menu">
          <button
            onClick={toggleMenu}
            className={`menu-button ${isMenuOpen ? "open" : ""}`}
          >
            <MenuIcon size={24} strokeWidth={1.25} color={color} />
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
