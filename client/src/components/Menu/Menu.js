import "./menu.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import Login from "../Modal-Components/Login/Login";

const Menu = ({ isOpen, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
    setModalContent(<Login />);
  };

  return (
    <>
      <div className={`menu-container ${isOpen ? "open" : ""}`}>
        <div>
          <button onClick={onClose} className="menu-close-button">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="menu-links-container">
          <Link className="menu-link" to="/" onClick={onClose}>
            <span>HOME</span>
          </Link>
          {/*
          <Link className="menu-link" to="/About" onClick={onClose}>
            <span>ABOUT</span>
          </Link>
  */}
          <Link className="menu-link" to="/Attend" onClick={onClose}>
            <span>ATTEND</span>
          </Link>
          <Link className="menu-link" to="/Gallery" onClick={onClose}>
            <span>GALLERY</span>
          </Link>
        </div>
        <div>
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
