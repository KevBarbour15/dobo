import { useEffect } from "react";
import gsap from "gsap";

const useFadeIn = (shouldFadeIn, element, duration, y) => {
  useEffect(() => {
    if (shouldFadeIn) {
      gsap.from(element, {
        duration: duration,
        opacity: 0,
        y: y,
        ease: "sine.inOut",
        clearProps: "all",
      });
    }
  }, [shouldFadeIn, element, duration, y]);
};

export default useFadeIn;
