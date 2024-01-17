import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import img from "../../assets/images/dobo-11.jpg";

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
    <div className="contact-container">
      <div className="contact-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="contact-right">
        <div className="contact-title-container">
          <div className="contact-title">Contact</div>
        </div>
        <div className="contact-info-container">
          <div className="contact-text">
            <div className="contact-ig">
              <p>Instagram:</p>

              <a
                className="contact-logo"
                href="https://www.instagram.com/dobonyc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon className="logo-icon" icon={faInstagram} />
              </a>
            </div>

            <div className="contact-email">
              <p>All other inquiries:</p>
              <a className="contact-logo" href="mailto:dobodinner@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
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
