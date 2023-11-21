import React, { useState } from "react";
import Login from "./modal-components/Login";
import Modal from "./Modal";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOwnerLogin = () => {
    setModalContent(<Login onClose={() => setModalOpen(false)} />);
    setModalOpen(true);
  };

  return (
    <footer>
      <button type="button" onClick={handleOwnerLogin}>
        owner
      </button>
      <Modal isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>{modalContent}</div>
      </Modal>
    </footer>
  );
};

export default Footer;
