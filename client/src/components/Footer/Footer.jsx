import "./footer.css";

// icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Footer = () => {
  useGSAP(() => {
    let tl = gsap.timeline({ delay: 0.05, ease: "sine.inOut" });

    tl.from(
      ".footer-title",
      {
        delay: 0.5,
        opacity: 0,
        duration: 0.75,
      },
      0
    ).from(
      ".footer-icons",
      {
        delay: 0.5,
        opacity: 0,
        duration: 0.75,
      },
      0
    );
  });

  return (
    <div className="footer-container">
      <div className="footer-title">
        <span>© 2024 DOBO NYC</span>
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
  );
};

export default Footer;
