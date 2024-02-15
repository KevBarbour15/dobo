import { useEffect } from "react";
import gsap from "gsap";

const useAnimateImages = (element) => {
  useEffect(() => {
    gsap.from(element, {
      delay: 0.5,
      opacity: 0,
      stagger: 0.08,
      ease: "sine.inOut",
    });
  }, [element]);
};

export default useAnimateImages;
