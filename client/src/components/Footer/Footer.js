import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// animation-hooks
import useFadeIn from "../../animation-hooks/fadeIn.js";

const Footer = () => {
  useFadeIn(true, ".footer-title", 0.5, 0.25, 5);
  useFadeIn(true, ".footer-icons", 0.5, 0.25, 5);

  return (
    <div className="footer-container">
      <div className="footer-overlay">
        <div className="footer-title">
          <span>© 2024 DOBO</span>
        </div>
        <div className="footer-icons">
          <div className="footer-icon">
            <a
              className="item footer"
              href="https://www.instagram.com/dobonyc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className="icon" icon={faInstagram} />
            </a>
          </div>

          <div className="footer-icon">
            <a className="item footer" href="mailto:dobonyc@gmail.com">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
