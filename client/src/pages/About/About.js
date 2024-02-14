import "./about.css";
import { useEffect, useState } from "react";
import { randomImageArray2 } from "../../assets/images/imageArray.js";
import { randomThumbnailArray2 } from "../../assets/thumbnail-images/thumbnailArray.js";

import PageTitle from "../../components/PageTitle/PageTitle.js";

import useFadeIn from "../../animation-hooks/fadeIn.js";

const About = () => {
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // animate images and content
  useFadeIn(true, ".about-container", 1, 0);
  useFadeIn(true, ".image-container", 1, 0);
  useFadeIn(true, ".about-info-container", 1, 30);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomImageArray2.length);
    setImage(randomImageArray2[randomIndex]);
    setThumbnail(randomThumbnailArray2[randomIndex]);
  }, []);

  return (
    <div id="about" className="about-container">
      <div className="page-left">
        <div className="image-container">
          <img src={image} alt="dobo" />
        </div>
      </div>
      <div className="page-right">
        <PageTitle title={"about"} thumbnail={thumbnail} />
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
