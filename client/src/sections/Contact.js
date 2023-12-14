import "../styles/contact.css";
import contactImage from "../assets/images/dobo-vertical-4.png";

const Contact = () => {
  return (
    <div id="contact" className="contact-container">
      <div className="contact-left">
        <div className="contact-info-text">
          <h2>Contact</h2>

          <div className="contact-ig">Follow us on Instagram: @dobonyc</div>
          <div className="contact-email">
            For all other inquiries, please email us at: @dobodinner@gmail.com
          </div>
        </div>
      </div>
      <div className="contact-right">
        <div className="contact-image-container">
          <img className="contact-image" src={contactImage}></img>
        </div>
      </div>
    </div>
  );
};

export default Contact;
