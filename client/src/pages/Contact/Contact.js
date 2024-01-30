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
    showSuccessNotification(enqueueSnackbar, "Feature coming soon.");
  };

  // separate the 2 links and make sure it extends on mobile
  return (
    <div className="contact-container">
      <div className="contact-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="contact-right">
        <div className="contact-title-container">
          <div className="contact-title-img">{/* placeholder */}</div>
          <div className="contact-title">contact</div>
        </div>
        <div className="contact-info-container">
          <div className="subscribe-container">
            <p>Be the first to know about Dobo's next dinner:</p>
            <div className="subscribe-email">
              <input placeholder="Email" required></input>
              <button className="button" onClick={handleSubscribe}>
                Subscribe
              </button>
            </div>

            <div className="contact-links-container">
              <div className="contact-icons">
                <div className="contact-icon">
                  <p>Follow Dobo NYC on Instagram:</p>
                  <a
                    className="item ig"
                    href="https://www.instagram.com/dobonyc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon className="icon" icon={faInstagram} />
                  </a>
                </div>

                <div className="contact-icon">
                  <p>For all inquiries, contact us here:</p>
                  <a className="item email" href="mailto:dobonyc@gmail.com">
                    <FontAwesomeIcon className="icon" icon={faEnvelope} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
