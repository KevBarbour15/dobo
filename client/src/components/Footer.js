import { useState } from "react";
import "../styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import Login from "../components/modal-components/Login";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
    setModalContent(<Login />); 
  };

  return (
    <div className="footer-container">
      <div className="footer-location">
        <h3>Brooklyn, NY</h3>
      </div>
      <div className="footer-login">
        <a onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faKey} />
        </a>
      </div>
      <Modal
        isVisible={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div>{modalContent}</div>
      </Modal>
    </div>
  );
};

export default Footer;
