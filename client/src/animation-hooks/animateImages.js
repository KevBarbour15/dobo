import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useAnimateImages = (shouldAnimate, element) => {
  useGSAP(() => {
    if (!shouldAnimate) return;
    gsap.from(element, {
      delay: 0.75,
      opacity: 0,
      stagger: 0.075,
      y: 25,
      scale: 0.75,
      ease: "sine.inOut",
    });
  }, [shouldAnimate, element]);
};

export default useAnimateImages;
