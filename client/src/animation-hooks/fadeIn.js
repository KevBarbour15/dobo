import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useFadeIn = (shouldFadeIn, element, duration, delay) => {
  useGSAP(() => {
    if (!shouldFadeIn) return;
    gsap.from(element, {
      duration: duration,
      delay: delay,
      opacity: 0,
    });
  }, [shouldFadeIn, element, duration, delay]);
};

export default useFadeIn;
