import "./menu.css";
import { useState } from "react";
import { Link } from "react-router-dom";

// Component imports
import Modal from "../Modal/Modal.jsx";
import Login from "../Modal-Components/Login/Login.jsx";

// GSAP animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
      gsap.set(links, { y: 25, opacity: 0 });
      gsap.to(links, {
        delay: 0.15,
        y: 0,
        opacity: 1,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className={`menu-container ${isOpen ? "open" : ""}`}>
        <div className="menu-close-button-container">
          <button onClick={onClose} className="menu-close-button">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="menu-links-container">
          <Link className="menu-link" to="/" onClick={onClose}>
            <div className="link-wrapper">
              <span>HOME</span>
            </div>
          </Link>

          <Link className="menu-link" to="/About" onClick={onClose}>
            <div className="link-wrapper">
              <span>ABOUT</span>
            </div>
          </Link>

          <Link className="menu-link" to="/Attend" onClick={onClose}>
            <div className="link-wrapper">
              <span>ATTEND</span>
            </div>
          </Link>

          <Link className="menu-link" to="/Gallery" onClick={onClose}>
            <div className="link-wrapper">
              <span>GALLERY</span>
            </div>
          </Link>
        </div>
        <div className="login-button-container">
          <button onClick={handleOpenModal} className="menu-login-button">
            <span className="material-icons">login</span>
          </button>
        </div>
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