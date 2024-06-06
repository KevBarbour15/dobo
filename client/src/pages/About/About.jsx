import "./about.scss";
import { useEffect, useState } from "react";

// image imports
import signature from "../../assets/images/signature.png";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import logo from "../../assets/images/logo-black.png";

// animation imports
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import useParallax from "../../animation-hooks/parallax.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const About = () => {
  // custom fade and parallax hooks
  useFadeIn(true, ".page-container", 1.25, 0);
  useParallax();

  useGSAP(() => {
    const p = new SplitText(".about-text p", {
      type: "lines",
    });

    let tl = gsap.timeline({ ease: "sine.out" });
    tl.from(
      p.lines,
      {
        x: function (i) {
          if (i % 2 === 0) {
            return -100;
          }
          return 100;
        },
        opacity: 0,
        stagger: 0.1,
        rotationX: 45,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 70%",
          end: "top 40%",
          scrub: 5,
        },
      },
      0
    ).from(
      ".signature",
      {
        opacity: 0,
        delay: 0.5,
        rotationX: 90,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 50%",
          end: "top +=100",
          scrub: 5,
        },
      },
      1
    );
  });

  return (
    <div className="page-container">
      <div className="parallax">
        <div className="about-layer image-layer"></div>
        <div className="page-title">ABOUT</div>
      </div>

      <div className="page-bottom">
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
            <img className="signature" src={signature} alt="signature" />
            <p className="paragraph">Sean Arguelles, creator of Dobo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
