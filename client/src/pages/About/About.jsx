import "./about.scss";
import { useEffect, useState } from "react";

// image imports
import { randomImageArray2 } from "../../assets/images/imageArray.js";
import signature from "../../assets/images/signature.png";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

// animation imports
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const About = () => {
  const [image, setImage] = useState("");

  useGSAP(() => {
    const p = new SplitText(".paragraph", {
      type: "lines",
      position: "relative",
    });

    let tl = gsap.timeline({ delay: 0.5, ease: "sine.inOut" });
    tl.from(
      p.lines,
      {
        duration: 0.75,
        y: 75,
        opacity: 0,
        stagger: 0.01,
        rotationX: 45,
      },
      0
    ).from(
      ".signature",
      {
        duration: 0.75,
        y: 75,
        opacity: 0,
        rotationX: 45,
      },
      0.2
    );

    let imageTl = gsap.timeline();

    imageTl.from(".image-container img", {
      delay: 0.75,
      duration: 0.25,
      opacity: 0,
      scale: 1.05,
      ease: "sine.inOut",
    });
  });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomImageArray2.length);
    setImage(randomImageArray2[randomIndex]);
  }, []);

  return (
    <>
      <PageTransition />
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
                For 15 years I’ve been cooking and eating my way through New
                York City, a heavenly playground for food fanatics. The thing
                is, you can dine at hundreds of restaurants, but there’s
                something undeniably special about a home-cooked meal.
              </p>
              <p className="paragraph">
                Since food and family are central to our culture, you’ll never
                leave hungry after visiting a Filipino household. So I invite
                you to Dobo - an intimate Filipino-American dining experience
                highlighting the recipes and flavors I was raised on.
              </p>
              <img className="signature" src={signature} alt="signature" />
              <p className="paragraph">Sean Arguelles, creator of Dobo</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
