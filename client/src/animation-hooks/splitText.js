import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useSplitText = (element, delay) => {
  useGSAP(() => {
    gsap.from(element.words, {
      delay: delay,
      y: 25,
      opacity: 0,
      autoAlpha: 0,
      ease: "sine.inOut",
      stagger: 0.0025,
    });
  }, [element, delay]);
};

export default useSplitText;
