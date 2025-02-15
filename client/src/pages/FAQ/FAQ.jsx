import "./FAQ.scss";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion.jsx";

import faqData from "./faqData.js";
import faqImage from "../../assets/images/faq.jpg";

// component imports
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import LogoAnimation from "../../components/LogoAnimation/LogoAnimation.jsx";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePageScroll from "../../animation-hooks/pageScroll.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const FAQ = () => {
  useFadeIn(".page-container", 1, 0, faqImage);
  usePageScroll();

  useGSAP(() => {
    let faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      gsap.set(item, {
        y: 25,
        opacity: 0,
      });
    });

    faqItems.forEach((item) => {
      gsap.to(item, {
        delay: 0.35,
        duration: 0.3,
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=25",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="page-title-container">
          <div className="splash-image-container">
            <div
              className="splash-image"
              style={{ backgroundImage: `url(${faqImage})` }}
            >
              &nbsp;
            </div>

            <div className="logo-animation-container">
              <LogoAnimation />
            </div>
          </div>
          <PageTitle title={"FAQ"} />
        </div>
        <div className="container">
          <div className="page-content">
            <Accordion type="single" collapsible defaultValue="">
              {faqData.map((item, index) => {
                return (
                  <div className="faq-item" key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
            <p className="faq-footer faq-item">
              For additional questions or information, you can contact us{" "}
              <Link
                className="faq-link"
                href="mailto:dobonyc@gmail.com"
                aria-label="Send email to DOBO NYC"
              >
                here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
