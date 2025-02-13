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
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

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
      let tl = gsap.timeline({
        delay: 0.125,
      });

      // Split each link text into characters
      links.forEach((link, index) => {
        const splitText = new SplitText(link, { type: "chars" });
        const chars = splitText.chars;

        tl.from(
          chars,
          {
            duration: 0.3,
            opacity: 0,
            ease: "linear",
            stagger: index % 2 === 0 ? -0.075 : 0.075,
            x: index % 2 === 0 ? -40 : 40,
          },
          "<"
        );
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
            <div key={path} className="menu-link-wrapper">
              <Link
                className="menu-link"
                to={path}
                onClick={onClose}
                rel={path === "/gallery" ? "preload" : undefined}
              >
                <div className="link-wrapper">{label}</div>
              </Link>
            </div>
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
