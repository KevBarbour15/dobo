import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useAnimateImages = (shouldAnimate, element) => {
  useGSAP(() => {
    if (!shouldAnimate) return;
    gsap.from(element, {
      delay: 0.5,
      opacity: 0,
      stagger: 0.1,
      y: 25,
      ease: "sine.inOut",
    });
  }, [shouldAnimate, element]);
};

export default useAnimateImages;
