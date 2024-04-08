import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useSplitText = (element, delay) => {
  useGSAP(() => {
    gsap.from(element.lines, {
      delay: delay,
      y: 25,
      opacity: 0,
      autoAlpha: 0,
      ease: "sine.inOut",
      stagger: 0.035,
    });
  }, [element, delay]);
};

export default useSplitText;
