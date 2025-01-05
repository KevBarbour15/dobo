import "./about.scss";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// image imports
import aboutImage from "../../assets/images/about.jpg";
import aboutVert from "../../assets/images/about-vert.jpg";

// animation imports
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import usePageScroll from "../../animation-hooks/pageScroll.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const About = () => {
  useFadeIn(true, ".page-container", 1, 0);
  usePageScroll();
  /*
  useGSAP(() => {
    const p = new SplitText(".about-text p", {
      type: "lines",
    });

    gsap.set(".about-image", {
      opacity: 0,
    });

    p.lines.forEach((line) => {
      gsap.set(line, {
        opacity: 0,
      });
    });

    gsap.to(".about-image", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.35,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".about-image",
        start: "top bottom-=50",
        toggleActions: "play reverse play reverse",
      },
    });

    p.lines.forEach((line) => {
      gsap.to(line, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        delay: 0.35,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: line,
          start: "top bottom-=50",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  });
*/
  return (
    <>
      <div className="page-container">
        <div className="splash-image-container">
          <div
            className="splash-image"
            style={{ backgroundImage: `url(${aboutImage})` }}
          >
            &nbsp;
          </div>
        </div>

        <PageTitle title={"About"} />
        <div className="container">
          <div className="page-content">
            <div className="about-container">
              <div className="about-image">
                <img src={aboutVert} alt="about" />
              </div>
              <div className="about-text">
                <p>
                  Sean’s culinary journey, inspired by his upbringing in NYC and
                  Texas, reflects a deep connection to Filipino traditions and a
                  passion for exceptional food. After cooking for 15 years and
                  experiencing the highs and lows of fine dining, Sean founded
                  Dobo as a tribute to his heritage, aiming to combine his
                  culinary skills with a mission to highlight Filipino food.
                  Join us for a special evening of elevated Filipino dishes and
                  heartfelt hospitality, where each meal is crafted to make you
                  feel like family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
