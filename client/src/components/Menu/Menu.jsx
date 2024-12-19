import "./menu.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

// Component imports
import Modal from "../Modal/Modal.jsx";
import Login from "../Modal-Components/Login/Login.jsx";

// GSAP animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MENU_LINKS = [
  { path: "/", label: "HOME" },
  { path: "/about", label: "ABOUT" },
  { path: "/attend", label: "ATTEND" },
  { path: "/gallery", label: "GALLERY" },
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
        ease: "sine.out",
        stagger: 0.075,
        x: (i) => (i % 2 === 0 ? 50 : -50),
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className={`menu-container ${isOpen ? "open" : ""}`}>
        <button onClick={onClose} className="menu-close-button">
          <span className="material-icons">close</span>
        </button>

        <div className="menu-links-container">
          {MENU_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              className="menu-link"
              to={path}
              onClick={onClose}
            >
              <div className="link-wrapper">
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>

        <button onClick={handleOpenModal} className="menu-login-button">
          <span className="material-icons">login</span>
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
