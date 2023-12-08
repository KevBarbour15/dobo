import { useState } from "react";
import "../styles/menu.css";
import { Link } from "react-router-dom";
import Login from "./modal-components/Login";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLock, faKey } from "@fortawesome/free-solid-svg-icons";

const SlidingMenu = ({ isOpen }) => {
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
          <div className="menu-ig-link">
            <button
              className="ig-link"
              href="https://www.instagram.com/dobonyc/"
              type="button"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </button>
          </div>
          <div className="menu-list">
            <Link to="/">Home</Link>
            <Link to="/Attend">Attend</Link>
            <Link to="/About">About</Link>
            <Link to="/Contact">Contact</Link>
          </div>
          <div className="menu-footer">
            <footer>
              <div className="footer-left">
                <button
                  className="footer-admin-btn"
                  type="button"
                  onClick={handleOwnerLogin}
                >
                  <FontAwesomeIcon icon={faKey} />
                </button>
                <Modal
                  isVisible={isModalOpen}
                  onClose={() => setModalOpen(false)}
                >
                  <div>{modalContent}</div>
                </Modal>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingMenu;
