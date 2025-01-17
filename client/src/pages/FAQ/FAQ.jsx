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
import { MoveDown } from "lucide-react";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePageScroll from "../../animation-hooks/pageScroll.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const FAQ = () => {
  // custom parallax hook
  // custom fade and parallax hooks
  useFadeIn(true, ".page-container", 1, 0);
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
        delay: 0.15,
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

    gsap.to(".scroll-down-container", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".scroll-down-container",
        start: "bottom bottom",
        end: "bottom center",
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
            style={{ backgroundImage: `url(${faqImage})` }}
          >
            &nbsp;
          </div>

          <div className="scroll-down-container">
            <MoveDown strokeWidth={1.25} size={40} />
          </div>
        </div>
        <PageTitle title={"FAQ"} />
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
              <a
                className="faq-link"
                href="mailto:dobonyc@gmail.com"
                aria-label="Send email to DOBO NYC"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
