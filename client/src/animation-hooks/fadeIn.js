import { useEffect } from "react";
import gsap from "gsap";

const useFadeIn = (shouldFadeIn, element, duration, delay, y) => {
  useEffect(() => {
    if (shouldFadeIn) {
      gsap.from(element, {
        duration: duration,
        delay: delay,
        opacity: 0,
        y: y,
        ease: "sine.inOut",
      });
    }
  }, [shouldFadeIn, element, duration, delay, y]);
};

export default useFadeIn;
