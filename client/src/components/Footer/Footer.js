import "./footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-location">
        <h3>© 2024 DOBO Nyc.</h3>
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
    </div>
  );
};

export default Footer;
