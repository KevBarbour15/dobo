import { useEffect } from "react";
import gsap from "gsap";

const useAnimateImages = (shouldAnimate, element) => {
  useEffect(() => {
    if (!shouldAnimate) return;
    gsap.from(element, {
      delay: 0.5,
      opacity: 0,
      stagger: 0.1,
      y: 20,
      ease: "sine.inOut",
    });
  }, [shouldAnimate, element]);
};

export default useAnimateImages;
