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
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      x: (i) => (i % 2 === 0 ? 125 : -125),
      onComplete: () => {
        let scrollTl = gsap.timeline({
          ease: "linear",
          scrollTrigger: {
            trigger: ".page-title",
            start: "center center-=100",
            end: "+=100",
            scrub: 1,
          },
        });

        scrollTl
          .to(
            ".image-layer",
            {
              opacity: 0,
              scrollTrigger: {
                scrub: 1,
                trigger: ".image-layer",
                start: "center center",
                end: "+=850",
              },
            },
            0
          )
          .to(
            titleSplitUpper.chars,
            {
              x: (i) => (i % 2 === 0 ? 125 : -125),
              opacity: 0,
              stagger: 0.15,
              scrollTrigger: {
                scrub: 2,
                trigger: ".page-title",
                start: "center center-=100",
                end: "+=100",
              },
            },
            0
          )
          .from(
            ".title-container",
            {
              opacity: 0,
              scrollTrigger: {
                trigger: ".title-container",
                start: "top center",
                end: "+=150",
                scrub: 2,
              },
            },
            0.15
          )
          .from(
            titleSplitLower.chars,
            {
              opacity: 0,
              stagger: 0.15,
              x: (i) => (i % 2 === 0 ? 125 : -125),
              scrollTrigger: {
                trigger: ".title-container",
                start: "top center",
                end: "+=150",
                scrub: 2,
              },
            },
            0.5
          );
      },
    });
  });
};

export default useParallax;
