import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useAnimateForm = (element) => {
  useGSAP(() => {
    gsap.from(element, {
      delay: 0.5,
      opacity: 0,
      stagger: 0.05,
      y: 25,
      ease: "sine.inOut",
    });
  }, [element]);
};

export default useAnimateForm;
