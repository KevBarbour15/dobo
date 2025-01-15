import "./success.scss";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className="success-container">
      <div className="container">
        <div className="success-content">
          <h2>Thank you for your purchase!</h2>
          <p>
            Stay tuned for more information regarding event details and
            location.
          </p>
          <p>
            For additional questions or information, you can refer to our{" "}
            <Link className="faq-link" to="/faq">
              FAQ page
            </Link>{" "}
            or contact us{" "}
            <a
              className="faq-link"
              href="mailto:dobonyc@gmail.com"
              aria-label="Send email to DOBO NYC"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
