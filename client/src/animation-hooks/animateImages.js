import { useEffect } from "react";
import gsap from "gsap";

const useAnimateImages = (element) => {
  useEffect(() => {
    gsap.from(element, {
      opacity: 0,
      stagger: 0.075,
      ease: "sine.inOut",
    });
  }, [element]);
};

export default useAnimateImages;
