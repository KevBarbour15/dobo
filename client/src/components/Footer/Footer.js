import "./footer.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import Modal from "../Modal/Modal";
import Login from "../Modal-Components/Login/Login";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
    setModalContent(<Login />);
  };

  return (
    <div className="footer-container">
      <div className="footer-title">
        <button onClick={handleOpenModal}>
          <span>© 2024 DOBO</span>
        </button>
      </div>
      <div className="footer-icons">
        <div className="footer-icon">
          <a
            className="item ig"
            href="https://www.instagram.com/dobonyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="icon" icon={faInstagram} />
          </a>
        </div>

        <div className="footer-icon">
          <a className="item email" href="mailto:dobonyc@gmail.com">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
          </a>
        </div>
      </div>
      <Modal
        title={"Owner"}
        isVisible={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

export default Footer;
