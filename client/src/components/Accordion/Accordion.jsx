import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./accordion.scss";

const Accordion = ({ header, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Show content
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        // Hide content
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <button
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <p>{header}</p>
        <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className="accordion-content"
        ref={contentRef}
        style={{ height: 0, overflow: "hidden" }}
      >
        <div className="accordion-content-inner">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
