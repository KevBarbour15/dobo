import "./animation-overlay.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const StageOverlay = () => {
  useGSAP(() => {
    const staggerEach = 0.19;
    let tl = gsap.timeline();

    tl.from(".grads__row", {
      opacity: 0,
      duration: 1,
      stagger: staggerEach,
      ease: "sine.inOut",
    }).fromTo(
      ".grads__row",
      {
        x: "-35%",
      },
      {
        x: "35%",
        duration: 2.75,
        ease: "sine.inOut",
        stagger: {
          each: staggerEach,
          yoyo: true,
          repeat: -1,
        },
      },
      0
    );
  });

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div className="stage">
        <div className="stage__overlay"></div>
        <div className="grads">
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
          <div className="grads__row"></div>
        </div>
      </div>
    </>
  );
};

export default StageOverlay;
