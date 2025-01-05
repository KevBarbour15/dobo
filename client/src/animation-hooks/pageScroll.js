import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const usePageScroll = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Initial animation for titleSplitUpper on page load
    let tl = gsap.timeline({
      ease: "linear",
    });
    tl.to(".title", {
      scrollTrigger: {
        trigger: ".title-container",
        start: "center bottom",
        end: "center center",
        scrub: 1,
        onLeave: function () {
          let titleTl = gsap.timeline({
            ease: "linear",
          });

          titleTl
            .set(".title", {
              position: "absolute",
            })

            .to(".title-container", {
              borderBottom: "1px solid black",
              duration: 0.3,
            })
            .to(
              ".title-dark",
              {
                y: 0,
                duration: 1,
              },
              0
            )
            .to(
              ".title",
              {
                color: "black",
                filter: "drop-shadow(0.025em 0.025em transparent)",
                duration: 0.3,
              },
              0
            )
            .to(
              ".header-container",
              {
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                backgroundColor: "#ebe2d9",
                duration: 0.3,
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
                duration: 0.3,
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
              ".title",
              {
                position: "fixed",
              },
              0
            )
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
                filter: "drop-shadow(0.025em 0.025em black)",
                color: "#f2f1f0",
                duration: 0.3,
              },
              0
            )

            .to(
              ".header-container",
              {
                borderTop: "1px solid transparent",
                borderBottom: "1px solid transparent",
                backgroundColor: "transparent",
                duration: 0.3,
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
                duration: 0.3,
              },
              0
            );
        },
      },
    });
  });
};

export default usePageScroll;
