import "../styles/contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import PhotoGallery from "../components/PhotoGallery";
import { photoArray3 } from "../assets/images/photoArrays";

const Contact = () => {
  return (
    <div id="contact" className="contact-container">
      <div className="contact-left">
        <div className="contact-info-container">
          <div className="contact-title">Contact</div>

          <div className="contact-text">
            <div className="contact-ig">
              <p>Instagram:</p>

              <div className="contact-ig-logo">
                <a href="https://www.instagram.com/dobonyc" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>

            <div className="contact-email">
              <p>All other inquiries:</p>

              <div className="contact-email-logo">
                <a href="mailto:dobodinner@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>
            <div className="subscribe-container">
              <p>Be the first to know about Dobo's next dinner:</p>
              <div className="subscribe-email">
                <input placeholder="EMAIL" required></input>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-right">
        <div className="image-container">
          <PhotoGallery photos={photoArray3} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
