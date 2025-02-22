import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const usePageScroll = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({});
    tl.to(".title", {
      left: "50%",
      transformOrigin: "center",
      transform: "translate(-50%, -50%)",
      scrollTrigger: {
        trigger: ".splash-image",
        start: "top top",
        end: "bottom center",
        scrub: 1.5,
      },
    })
      .to(".title-wrapper-line", {
        width: "100%",
        left: "0",
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: ".splash-image",
          start: "top top",
          end: "bottom center",
          scrub: 1.5,
        },
      })
      .to(
        ".scroll-down-icon",
        {
          opacity: 0,
          scrollTrigger: {
            trigger: ".splash-image",
            start: "top top",
            end: "bottom center",
            scrub: 1.5,
          },
        },
        "<"
      );
  });
};

export default usePageScroll;
