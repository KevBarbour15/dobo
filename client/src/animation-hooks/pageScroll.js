import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const usePageScroll = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let tl = gsap.timeline({
      ease: "linear",
    });

    tl.to(".splash-image", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".splash-image",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    }).to(".title", {
      scrollTrigger: {
        trigger: ".title-container",
        start: "center bottom+=100svh",
        end: "center center",
        scrub: 1,
        onLeave: function () {
          let titleTl = gsap.timeline({
            ease: "linear",
          });

          titleTl
            .to(".title-container", {
              borderBottom: "1px solid black",
              duration: 0.5,
            })
            .to(
              ".title-dark",
              {
                opacity: 1,
                duration: 0.5,
              },
              0
            )
            .set(
              ".title",
              {
                opacity: 0,
              },
              0
            )
            .to(
              ".header-container",
              {
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                backgroundColor: "#f2f1f0",
                duration: 0.5,
              },
              0
            )
            .to(
              ".menu-button",
              {
                color: "black",
              },
              0
            )
            .to(
              ".header-title",
              {
                opacity: 1,
                duration: 0.5,
              },
              0
            );
        },
        onEnterBack: function () {
          let titleTl = gsap.timeline({
            ease: "linear",
          });
          titleTl
            .set(
              ".title-container",
              {
                borderBottom: "1px solid transparent",
              },
              0
            )
            .to(
              ".title",
              {
                opacity: 1,
                duration: 0.5,
              },
              0
            )
            .set(
              ".title-dark",
              {
                opacity: 0,
              },
              0
            )
            .to(
              ".header-container",
              {
                borderTop: "1px solid transparent",
                borderBottom: "1px solid transparent",
                backgroundColor: "transparent",
                duration: 0.5,
              },
              0
            )
            .to(
              ".menu-button",
              {
                color: "#f2f1f0",
              },
              0
            )
            .to(
              ".header-title",
              {
                opacity: 0,
                duration: 0.5,
              },
              0
            );
        },
      },
    });
  });
};

export default usePageScroll;
