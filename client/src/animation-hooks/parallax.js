import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const useParallax = () => {
  useGSAP(() => {
    // parallax scroll animation
    let titleSplitUpper = new SplitText(".page-title", {
      type: "chars",
    });

    let titleSplitLower = new SplitText(".title", {
      type: "chars",
    });

    let scrollTl = gsap.timeline();

    scrollTl
      .from(
        titleSplitUpper.chars,
        {
          opacity: 0,
          stagger: 0.15,
          x: function (i) {
            return i % 2 === 0 ? 250 : -250;
          },
        },
        0
      )
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
          x: function (i) {
            return i % 2 === 0 ? 250 : -250;
          },
          opacity: 0,
          stagger: 0.15,
          scrollTrigger: {
            scrub: 3,
            trigger: ".page-title",
            start: "center center-=100",
            end: "+=100",
          },
        },
        0
      )
      .from(
        titleSplitLower.chars,
        {
          opacity: 0,
          stagger: 0.15,
          x: function (i) {
            return i % 2 === 0 ? 250 : -250;
          },
          scrollTrigger: {
            trigger: ".title-container",
            start: "top center",
            end: "+=150",
            scrub: 3,
          },
        },
        0
      );
  });
};

export default useParallax;
