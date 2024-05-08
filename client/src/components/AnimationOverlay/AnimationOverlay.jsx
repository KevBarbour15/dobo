import "./animation-overlay.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const StageOverlay = () => {
  useGSAP(() => {
    const staggerEach = 0.19;
    let tl = gsap.timeline();

    tl.from(".grads-row", {
      opacity: 0,
      duration: 1,
      stagger: staggerEach,
      ease: "sine.inOut",
    }).fromTo(
      ".grads-row",
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
      <div className="animation-container">
        <div className="animation-container-overlay"></div>
        <div className="grads">
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
          <div className="grads-row"></div>
        </div>
      </div>
    </>
  );
};

export default StageOverlay;
