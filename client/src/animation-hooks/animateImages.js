import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useAnimateImages = (shouldAnimate, element) => {
  useGSAP(() => {
    if (!shouldAnimate) return;
    gsap.from(element, {
      delay: 0.75,
      opacity: 0,
      duration: 0.75,
      stagger: 0.025,
      ease: "sine.inOut",
    });
  }, []);
};

export default useAnimateImages;
