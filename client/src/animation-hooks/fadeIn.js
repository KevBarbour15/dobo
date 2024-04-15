import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useFadeIn = (shouldFadeIn, element, duration, delay, y) => {
  useGSAP(() => {
    if (!shouldFadeIn) return;
    gsap.from(element, {
      duration: duration,
      delay: delay,
      opacity: 0,
      y: y,
      ease: "sine.inOut",
    });
  }, [shouldFadeIn, element, duration, delay, y]);
};

export default useFadeIn;
