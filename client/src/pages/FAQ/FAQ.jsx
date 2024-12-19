import "./FAQ.scss";

import Accordion from "../../components/Accordion/Accordion.jsx";
import faqData from "./faqData.js";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useParallax from "../../animation-hooks/parallax.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const FAQ = () => {
  // custom parallax hook
  // custom fade and parallax hooks
  useFadeIn(true, ".page-container", 1, 0);
  useParallax();

  useGSAP(() => {
    let tl = gsap.timeline({ ease: "sine.out" });
    tl.from(
      ".list-item",
      {
        x: (i) => (i % 2 === 0 ? 50 : -50),
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".faq-info-container",
          start: "top 70%",
          end: "top +=300",
          scrub: 1,
        },
      },
      0
    );
  });

  return (
    <>
      <PageTransition />
      <div className="page-container">
        <div className="parallax">
          <div className="faq-layer image-layer"></div>
          <div className="page-title">FAQ</div>
        </div>

        <div className="page-bottom">
          <PageTitle title={"FAQ"} />
          <div className="container">
            {faqData.map((item, index) => {
              return (
                <Accordion
                  key={index}
                  header={item.question}
                  content={item.answer}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
