import "./about.scss";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// image imports
import aboutImage from "../../assets/images/about.jpg";
import aboutVert from "../../assets/images/about-2.jpg";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePageScroll from "../../animation-hooks/pageScroll.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";
import LogoAnimation from "../../components/LogoAnimation/LogoAnimation.jsx";

const About = () => {
  useFadeIn(".page-container", 1, 0, aboutImage);
  usePageScroll();

  useGSAP(() => {
    gsap.set(".about-image img", {
      yPercent: -50,
    });

    gsap.to(".about-image img", {
      yPercent: 0,
      scrollTrigger: {
        trigger: ".page-title-container",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="page-title-container">
          <div className="splash-image-container">
            <div
              className="splash-image"
              style={{ backgroundImage: `url(${aboutImage})` }}
            >
              &nbsp;
            </div>

            <div className="logo-animation-container">
              <LogoAnimation />
            </div>
          </div>
          <PageTitle title={"About"} />
        </div>

        <div className="container">
          <div className="page-content">
            <div className="about-container">
              <div className="about-image-container">
                <div className="about-image">
                  <img src={aboutVert} alt="about" />
                </div>
              </div>
              <div className="about-text-container">
                <h3>
                  "Filipino food is a cuisine of contrasts-bold yet subtle, rich
                  yet delicate, familiar yet surprising."{" "}
                  <span>- Claude Tayag</span>
                </h3>
                <div className="about-text-image-wrapper">
                  <img src={aboutImage} alt="about" />
                </div>

                <p className="about-text">
                  Sean's culinary journey, inspired by his upbringing in NYC and
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
