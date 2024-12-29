import "./about.scss";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

// animation imports
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import useParallax from "../../animation-hooks/parallax.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const About = () => {
  // custom fade and parallax hooks
  useFadeIn(true, ".page-container", 1, 0);
  useParallax();

  useGSAP(() => {
    const p = new SplitText(".about-text p", {
      type: "words",
    });

    let tl = gsap.timeline({ ease: "sine.out" });
    tl.from(p.words, {
      x: (i) => (i % 2 === 0 ? 25 : -25),
      opacity: 0,
      stagger: 0.1,
      //rotationX: 45,
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 70%",
        end: "top 40%",
        scrub: 1,
      },
    });
  });

  return (
    <>
      <div className="page-container">
        <div className="parallax">
          <div className="about-layer image-layer"></div>
          <div className="page-title">ABOUT</div>
        </div>

        <div className="page-bottom">
          <PageTitle title={"about"} />
          <div className="about-info-container container">
            <div className="about-text">
              <p>
                Sean’s culinary journey, inspired by his upbringing in NYC and
                Texas, reflects a deep connection to Filipino traditions and a
                passion for exceptional food. After cooking for 15 years and
                experiencing the highs and lows of fine dining, Sean founded
                Dobo as a tribute to his heritage, aiming to combine his
                culinary skills with a mission to highlight Filipino food. Join
                us for a special evening of elevated Filipino dishes and
                heartfelt hospitality, where each meal is crafted to make you
                feel like family.
              </p>
              <p>
                Since food and family are central to our culture, you’ll never
                leave hungry after visiting a Filipino household. So we invite
                you to Dobo - an intimate Filipino-American dining experience
                highlighting the recipes and flavors Sean was raised on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
