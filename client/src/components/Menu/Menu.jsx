import "./menu.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

// Component imports
import Modal from "../Modal/Modal.jsx";
import Login from "../Modal-Components/Login/Login.jsx";

import { X, LogIn } from "lucide-react";

// GSAP animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/attend", label: "Attend" },
  { path: "/gallery", label: "Gallery" },
  { path: "/faq", label: "FAQ" },
];

const Menu = ({ isOpen, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
    setModalContent(<Login />);
  };

  useGSAP(() => {
    const links = gsap.utils.toArray(".link-wrapper");
    if (isOpen) {
      let tl = gsap.timeline();
      tl.from(links, {
        duration: 0.35,
        delay: 0.125,
        opacity: 0,
        ease: "sine.inOut",
        stagger: 0.075,
        x: (i) => (i % 2 === 0 ? 50 : -50),
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className={`menu-container ${isOpen ? "open" : ""}`}>
        <button onClick={onClose} className="menu-close-button">
          <X strokeWidth={1.25} size={24} />
        </button>

        <div className="menu-links-container">
          {menuLinks.map(({ path, label }) => (
            <Link
              key={path}
              className="menu-link"
              to={path}
              onClick={onClose}
              rel={path === "/gallery" ? "preload" : undefined}
            >
              <div className="link-wrapper">{label}</div>
            </Link>
          ))}
        </div>

        <button onClick={handleOpenModal} className="menu-login-button">
          <LogIn strokeWidth={1.25} size={18} />
        </button>
      </div>
      <Modal
        title={"Owner"}
        isVisible={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div>{modalContent}</div>
      </Modal>
    </>
  );
};

export default Menu;
