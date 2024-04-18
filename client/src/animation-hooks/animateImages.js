import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useAnimateImages = (shouldAnimate, element) => {
  useGSAP(() => {
    if (!shouldAnimate) return;
    gsap.from(element, {
      delay: 0.65,
      opacity: 0,
      scale: 0.9,
      stagger: 0.05,
      ease: "sine.inOut",
    });
  }, []);
};

export default useAnimateImages;
