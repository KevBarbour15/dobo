import "./animation-overlay.scss";

//animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AnimationOverlay = () => {
  useGSAP(() => {
    const staggerEach = 0.1;
    let tl = gsap.timeline();

    tl.from(".grads-row", {
      opacity: 0,
      duration: 1,
      stagger: staggerEach,
      ease: "sine.outOut",
    }).fromTo(
      ".grads-row",
      {
        x: "-35%",
      },
      {
        x: "35%",
        duration: 2.75,
        ease: "sine.outOut",
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

export default AnimationOverlay;
