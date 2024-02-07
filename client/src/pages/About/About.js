import "./about.css";
import img from "../../assets/images/dobo-5.jpg";

import PageTitle from "../../components/PageTitle/PageTitle.js";

const About = () => {
  return (
    <div id="about" className="about-container">
      <div className="page-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="page-right">
        <PageTitle title={"about"} />
        <div className="about-info-container">
          <div className="about-text">
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
