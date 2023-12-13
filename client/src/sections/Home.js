import "../styles/home.css";
import homeImage from "../assets/images/dobo-horizontal-1.png";

const Home = () => {


  return (     
    <div className="home-container">
        <div className="home-image-container">
          <img className="home-image" src={homeImage}></img>
      </div>
    </div>
  );
};

export default Home;
