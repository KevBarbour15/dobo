import { useEffect } from "react";
import gsap from "gsap";

const useFadeIn = (shouldFadeIn, element, duration) => {
  useEffect(() => {
    if (shouldFadeIn) {
      gsap.from(element, {
        duration: duration,
        autoAlpha: 0,
        ease: "power3.inOut",
        clearProps: "all",
      });
    }
  }, [shouldFadeIn, element, duration]);
};

export default useFadeIn;
