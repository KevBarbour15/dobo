import "./about.scss";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// image imports
import aboutImage from "../../assets/images/about.jpg";
import aboutVert from "../../assets/images/about-vert.jpg";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePageScroll from "../../animation-hooks/pageScroll.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

import { MoveDown } from "lucide-react";

const About = () => {
  useFadeIn(".page-container", 1, 0, aboutImage);
  usePageScroll();

  useGSAP(() => {
    gsap.set(".about-image img", {
      yPercent: -60,
    });

    gsap.to(".about-image img", {
      yPercent: 0,
      scrollTrigger: {
        trigger: ".about-image img",
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
      },
    });

   gsap.to(".scroll-down-container", {
     opacity: 0,
     scrollTrigger: {
       trigger: ".scroll-down-container",
       start: "bottom bottom",
       end: "bottom 55%",
       scrub: 1,
     },
   });
  }, []);

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
          <div className="scroll-down-container">
            <MoveDown strokeWidth={1.25} size={40} />
          </div>
        </div>

        <PageTitle title={"About"} />
        <div className="container">
          <div className="page-content">
            <div className="about-container">
              <div className="about-image-container">
                <div className="about-image">
                  <img src={aboutVert} alt="about" />
                </div>
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
