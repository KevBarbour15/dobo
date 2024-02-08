import { useEffect } from "react";
import gsap from "gsap";

const useAnimateImages = (element) => {
  useEffect(() => {
    gsap.from(element, {
      autoAlpha: 0,
      scale: 0.75,
      stagger: 0.15,
      ease: "power4.inOut",
    });
  }, [element]);
};

export default useAnimateImages;
