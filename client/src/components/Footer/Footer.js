import { useState } from "react";
import "./footer.css";
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
      <div className="footer-location">
        <h3>© 2024 DOBO Nyc.</h3>
      </div>
      <div className="footer-login">
        <button onClick={handleOpenModal}>
          <span class="material-symbols-outlined">login</span>
        </button>
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
