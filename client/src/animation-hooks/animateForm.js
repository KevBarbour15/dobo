import { useEffect } from "react";
import gsap from "gsap";

const useAnimateForm = (element) => {
  useEffect(() => {
    gsap.from(element, {
      delay: .5,
      opacity: 0,
      stagger: 0.1,
      y: 25,
      ease: "sine.inOut",
    });
  }, [element]);
};

export default useAnimateForm;
