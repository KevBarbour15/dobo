import { useEffect } from "react";
import gsap from "gsap";

const useSlideIn = (element, duration) => {
  useEffect(() => {
    gsap.from(element, {
      x: "100%", 
      autoAlpha: 0, 
      duration: duration,
      ease: "power2.in", 
    });
  }, [element,duration]);
};

export default useSlideIn;
