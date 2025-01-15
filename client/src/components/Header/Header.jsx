import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./header.scss";

// component imports
import Menu from "../Menu/Menu.jsx";

// image imports
import logo from "../../assets/images/logo-black.png";

import { Menu as MenuIcon } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsGallery(location.pathname === "/gallery");
    setIsSuccess(location.pathname === "/success");
  }, [location]);

  useGSAP(() => {
    if (isGallery || isSuccess) {
      let tl = gsap.timeline({ duration: 0.25, ease: "linear" });

      tl.to(
        ".header-container",
        {
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          backgroundColor: "#f2f1f0",
        },
        0
      )
        .to(".header-title", { opacity: 1 }, 0)
        .to(".menu-button", { color: "black" }, 0);
    } else {
      let tl = gsap.timeline({ duration: 0, ease: "linear" });
      tl.to(".header-title", { opacity: 0 }, 0)
        .to(".menu-button", { color: "#f2f1f0" }, 0)
        .to(
          ".header-container",
          {
            borderTop: "1px solid transparent",
            borderBottom: "1px solid transparent",
            backgroundColor: "transparent",
          },
          0
        );
    }
  }, [isGallery, isSuccess]);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      <header className="header-container">
        <div className="header-menu">
          <button
            onClick={toggleMenu}
            className={`menu-button ${isMenuOpen ? "open" : ""}`}
          >
            <MenuIcon size={24} strokeWidth={1.25} />
          </button>
        </div>
        <Link to="/" aria-label="DOBO">
          <img className="header-title" src={logo} alt="DOBO" />
        </Link>
      </header>
    </>
  );
};

export default Header;
