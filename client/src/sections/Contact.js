import "../styles/contact.css";
import contactImage from "../assets/images/dobo-vertical-4.png";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-left">
        {" "}
        <h1>Contact</h1>
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
