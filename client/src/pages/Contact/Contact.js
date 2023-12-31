import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery.js";
import { photoArray3 } from "../../assets/images/photoArrays.js";
import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    // fill in logic to subscribe to new events

    showSuccessNotification(enqueueSnackbar, "Thank you for subscribing!");
  };

  return (
    <div id="contact" className="contact-container">
      <div className="contact-left">
        <div className="image-container">
          <PhotoGallery photos={photoArray3} />
        </div>
      </div>
      <div className="contact-right">
        <div className="contact-info-container">
          <div className="contact-title">Contact</div>
          <div className="contact-text">
            <div className="contact-ig">
              <p>Instagram:</p>

              <div className="contact-ig-logo">
                <a
                  href="https://www.instagram.com/dobonyc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <input placeholder="Email" required></input>
                <button onClick={handleSubscribe}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
