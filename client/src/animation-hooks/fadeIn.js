import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useFadeIn = (shouldFadeIn, element, duration, delay) => {
  useGSAP(() => {
    if (!shouldFadeIn) return;
    gsap.to(element, {
      duration: duration,
      delay: delay,
      opacity: 1,
    });
  }, [shouldFadeIn, element, duration, delay]);
};

export default useFadeIn;
