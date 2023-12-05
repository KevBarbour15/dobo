import { useState } from "react";
import "../styles/menu.css";
import { Link } from "react-router-dom";
import Login from "./modal-components/Login";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const SlidingMenu = ({ isOpen, toggleMenu }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOwnerLogin = () => {
    setModalContent(<Login onClose={() => setModalOpen(false)} />);
    setModalOpen(true);
  };

  return (
    <div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <div className="menu-container">
          <div className="menu-header">
            <div className="menu-title">
              <h3>Brooklyn, NY</h3>
            </div>
            <div className="menu-close">
              <button onClick={toggleMenu}>X</button>
            </div>
          </div>
          <div className="menu-list">
            <Link to="/">Home</Link>
            <Link to="/About">About</Link>
            <Link to="/Attend">Attend</Link>
          </div>
          <div className="menu-footer">
            <footer>
              <div className="footer-left">
                <button
                  className="footer-admin-btn"
                  type="button"
                  onClick={handleOwnerLogin}
                >
                  <FontAwesomeIcon icon={faLock} />
                </button>
                <Modal
                  isVisible={isModalOpen}
                  onClose={() => setModalOpen(false)}
                >
                  <div>{modalContent}</div>
                </Modal>
              </div>
              <div className="footer-right">
                <div className="footer-social">
                  <a href="https://www.instagram.com/dobonyc/">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingMenu;
