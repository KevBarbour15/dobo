import "./FAQ.scss";

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
    let faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item, index) => {
      gsap.set(item, {
        x: () => {
          if (index % 2 === 0) {
            return "-150%";
          } else {
            return "150%";
          }
        },
      });
    });

    faqItems.forEach((item) => {
      gsap.to(item, {
        delay: 0.15,
        duration: 0.75,
        x: 0,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, []);

  return (
    <>
      <div className="page-container">
        <div
          className="splash-image"
          style={{ backgroundImage: `url(${faqImage})` }}
        >
          &nbsp;
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
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
