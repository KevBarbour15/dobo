import "./about.css";
import { useEffect, useState } from "react";

// image imports
import { randomImageArray2 } from "../../assets/images/imageArray.js";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn.js";
import useAnimateImages from "../../animation-hooks/animateImages.js";
import useAnimateItems from "../../animation-hooks/animateItems.js";

const About = () => {
  const [image, setImage] = useState("");

  // animate images and content
  useFadeIn(true, ".about-container", 0.5, 0.25, 0);
  useFadeIn(true, ".about-info-container", 0.5, 0.25, 25);
  useAnimateImages(true, ".image-container");
  useAnimateItems(".paragraph");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomImageArray2.length);
    setImage(randomImageArray2[randomIndex]);
  }, []);

  return (
    <div id="about" className="about-container">
      <div className="page-left">
        <div className="image-container">
          <img src={image} alt="dobo" />
        </div>
      </div>
      <div className="page-right">
        <PageTitle title={"about"} />
        <div className="about-info-container">
          <div className="about-text">
            <p className="paragraph">
              For 15 years I’ve been cooking and eating my way through New York
              City, a heavenly playground for food fanatics. The thing is, you
              can dine at hundreds of restaurants, but there’s something
              undeniably special about a home-cooked meal.
            </p>
            <p className="paragraph">
              Since food and family are central to our culture, you’ll never
              leave hungry after visiting a Filipino household. So I invite you
              to Dobo - an intimate Filipino-American dining experience
              highlighting the recipes and flavors I was raised on.
            </p>
            <p className="paragraph">- Sean Arguelles, creator of DOBO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
