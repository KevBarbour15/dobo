import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const usePageScroll = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let tl = gsap.timeline({ delay: 0.75, ease: "sine.out" });

    // Get the actual height of the title container
    const titleContainer = document.querySelector(".title-container");
    const titleHeight = titleContainer.scrollHeight;

    const split = new SplitText(".title", { type: "chars" });

    split.chars.forEach((char) => {
      gsap.set(char, {
        y: -150,
      });
    });

    tl.set(".title", { left: "0%", xPercent: 0 })
      .to(
        ".splash-image-container",
        {
          minHeight: "0",
          duration: 0.5,
        },
        0
      )
      .to(
        ".title-container",
        {
          height: titleHeight,
          duration: 0.75,
          ease: "power4.out",
        },
        "<"
      )
      .to(
        ".splash-image-container",
        {
          height: `calc(100vh - ${titleHeight}px)`,
          duration: 0.5,
        },
        "<"
      )
      .to(
        split.chars,
        {
          duration: 0.5,
          opacity: 1,
          ease: "sine.inOut",
          stagger: { amount: -0.15, from: "center" },
          y: 0,
          rotateX: 0,
        },
        "<"
      );

    let tl2 = gsap.timeline({});
    tl2
      .to(".title", {
        left: "50%",
        transformOrigin: "center",
        transform: "translate(-50%, -50%)",
        scrollTrigger: {
          trigger: ".page-container-scroll-trigger",
          start: "top top",
          end: "center 30%",
          scrub: 2,
        },
      })
      .to(".title-wrapper-line", {
        width: "100%",
        left: "0",
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: ".page-container-scroll-trigger",
          start: "top top",
          end: "center 30%",
          scrub: 2,
        },
      })
      .to(
        ".scroll-down-icon",
        {
          opacity: 0,
          scrollTrigger: {
            trigger: ".page-container-scroll-trigger",
            start: "top top",
            end: "center 30%",
            scrub: 1,
          },
        },
        "<"
      );
  });
};

export default usePageScroll;
