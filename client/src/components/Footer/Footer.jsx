import "./footer.scss";

// icon imports
import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="footer-container"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="footer-title">
        <p>© 2025 DOBO NYC</p>
      </div>
      <nav className="footer-icons" aria-label="Social media links">
        <div className="footer-icon">
          <a
            href="https://www.instagram.com/dobonyc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit DOBO NYC on Instagram"
          >
            <Instagram strokeWidth={1.25} color="black" size={24} />
          </a>
        </div>

        <div className="footer-icon">
          <a
            href="mailto:dobonyc@gmail.com"
            aria-label="Send email to DOBO NYC"
          >
            <Mail strokeWidth={1.25} color="black" size={24} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
