import "./about.css";
import { useEffect, useState } from "react";

// image imports
import { randomImageArray2 } from "../../assets/images/imageArray.js";

import PageTitle from "../../components/PageTitle/PageTitle.js";

// animation imports
import gsap from "gsap";
import useFadeIn from "../../animation-hooks/fadeIn.js";
import useSplitText from "../../animation-hooks/splitText.js";
import { SplitText } from "gsap/SplitText";

const About = () => {
  const [image, setImage] = useState("");

  const split1 = new SplitText(".paragraph-1", {
    type: "chars,words,lines",
    position: "absolute",
  });

  const split2 = new SplitText(".paragraph-2", {
    type: "chars,words,lines",
    position: "absolute",
  });

  const split3 = new SplitText(".paragraph-3", {
    type: "chars,words,lines",
    position: "absolute",
  });

  // animate images and content
  useFadeIn(true, ".about-container", 0.5, 0.25, 0);
  useFadeIn(true, ".image-container", 0.5, 0.25, 0);
  useFadeIn(true, ".about-info-container", 0.5, 0.25, 25);
  useSplitText(split1, 0.5);
  useSplitText(split2, 1);
  useSplitText(split3, 1.5);

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
            <p className="paragraph-1">
              For 15 years I have been cooking and eating my way through New
              York City, a heavenly playground for food fanatics. You can dine
              at hundreds of restaurants, but there’s something undeniably
              special about a home-cooked meal.
            </p>
            <p className="paragraph-2">
              You’ll never leave hungry after visiting a Filipino household
              since food and family are central to our culture. So I invite you
              to Dobo - an unforgettable Filipino-American dining experience
              highlighting the recipes and flavors I was raised on.
            </p>
            <p className="paragraph-3">- Sean Arguelles, creator of DOBO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
