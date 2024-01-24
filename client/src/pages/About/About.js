import "./about.css";
import img from "../../assets/images/dobo-7.jpg";

const About = () => {
  return (
    <div id="about" className="about-container">
      <div className="about-left">
        <div className="image-container">
          <img src={img} alt="dobo" />
        </div>
      </div>
      <div className="about-right">
        <div className="about-title-container">
          <div className="about-title">about</div>
        </div>
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
