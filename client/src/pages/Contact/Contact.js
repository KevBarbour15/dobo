import "./contact.css";
import PageTitle from "../../components/PageTitle/PageTitle.js";

import img from "../../assets/images/dobo-11.jpg";

import { useSnackbar } from "notistack";
import { showSuccessNotification } from "../../util/notifications.js";

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    showSuccessNotification(enqueueSnackbar, "Feature coming soon.");
  };

  return (
    <div className="contact-container">
      <div className="contact-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="contact-right">
        <PageTitle title={"contact"} />

        <div className="contact-info-container">
          <div className="subscribe-container">
            <span>Be the first to know about Dobo's next dinner:</span>
            <div className="subscribe-email">
              <input placeholder="email" required></input>
              <button className="button" onClick={handleSubscribe}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
