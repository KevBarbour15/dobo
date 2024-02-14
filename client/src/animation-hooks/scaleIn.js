import { useEffect } from "react";
import gsap from "gsap";

const useScaleIn = (shouldScaleIn, element, duration) => {
  useEffect(() => {
    if (shouldScaleIn) {
      gsap.from(element, {
        duration,
        autoAlpha: 0,
        ease: "sine.out",
        scale: 0.15,
        clearProps: "all",
      });
    }
  }, [shouldScaleIn, element, duration]);
};

export default useScaleIn;
