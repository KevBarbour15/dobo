import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useParallax = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Initial animation for titleSplitUpper on page load
    let tl = gsap.timeline({
      ease: "linear",
    });

    tl.to(".title", {
      scrollTrigger: {
        trigger: ".title-container",
        start: "top bottom",
        end: "center center",
        scrub: 1,
        onLeave: function () {
          gsap.set(".title", {
            position: "absolute",
          });
          let titleTl = gsap.timeline({
            ease: "linear",
          });
          titleTl
            .to(".splash-image", {
              clipPath: "inset(0 100% 0 100%)",
            })
            .to(
              ".title",
              {
                color: "black",
                textShadow: "0 0px 0px rgba(0, 0, 0, 0)",
                duration: 0.5,
                fontSize: "64px",
              },
              0
            )
            .to(
              ".title-container",
              {
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                duration: 0.5,
              },
              0
            )
            .to(
              ".menu-button",
              {
                color: "black",
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
            .to(".splash-image", {
              clipPath: "inset(0 0% 0 0%)",
            })
            .set(
              ".title",
              {
                position: "fixed",
              },
              0
            )
            .to(
              ".title",
              {
                color: "#f2f1f0",
                duration: 0.3,
                textShadow: "0 1.75px 2.75px rgba(0, 0, 0, 0.75)",
                fontSize: "98px",
              },
              0
            )
            .to(
              ".title-container",
              {
                borderTop: "1px solid transparent",
                borderBottom: "1px solid transparent",
                duration: 0.3,
              },
              0
            )
            .to(
              ".menu-button",
              {
                color: "#f2f1f0",
                duration: 0.3,
              },
              0
            );
        },
      },
    });
  });
};

export default useParallax;
