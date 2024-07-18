import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useParallax = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let titleSplitUpper = new SplitText(".page-title", {
      type: "chars",
    });

    let titleSplitLower = new SplitText(".title", {
      type: "chars",
    });

    // Initial animation for titleSplitUpper on page load
    gsap.from(titleSplitUpper.chars, {
      delay: 0.25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.35,
      x: (i) => (i % 2 === 0 ? 75 : -75),
      onComplete: () => {
        let scrollTl = gsap.timeline({
          ease: "sine.out",
        });

        scrollTl
          .to(
            ".image-layer",
            {
              opacity: 0,
              scale: 1.15,
              scrollTrigger: {
                scrub: 2,
                trigger: ".image-layer",
                start: "center center",
                end: "+=850",
                pin: true,
              },
            },
            0
          )
          .to(
            titleSplitUpper.chars,
            {
              x: (i) => (i % 2 === 0 ? 75 : -75),
              opacity: 0,
              stagger: 0.1,
              scrollTrigger: {
                scrub: true,
                trigger: ".page-title",
                pin: true,
                start: "center center",
                end: "center top",
              },
            },
            0
          )
          .from(".title-container", {
            opacity: 0,
            scrollTrigger: {
              trigger: ".title-container",
              start: "top 75%",
              end: "top center",
              scrub: true,
            },
          })
          .from(titleSplitLower.chars, {
            opacity: 0,
            stagger: 0.15,
            x: (i) => (i % 2 === 0 ? 75 : -75),
            scrollTrigger: {
              trigger: ".title-container",
              start: "top 75%",
              end: "top center",
              scrub: true,
            },
          });
      },
    });
  });
};

export default useParallax;
