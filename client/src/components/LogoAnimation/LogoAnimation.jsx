import "./logo-animation.scss";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import D from "../../assets/images/D.png";
import O from "../../assets/images/O.png";
import B from "../../assets/images/B.png";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LogoAnimation = () => {
  const container = useRef(null);
  const location = useLocation();
  useGSAP(() => {
    if (!container.current) return;

    const letters = container.current.querySelectorAll(
      ".logo-animation-letter"
    );
    const tl = gsap.timeline();
    const scrollTl = gsap.timeline();

    tl.set(letters, {
      opacity: 0,
      y: () => (location.pathname === "/" ? -75 : 75),
    }).to(letters, {
      delay: 0.5,
      duration: 0.75,
      ease: "sine.inOut",
      stagger: { amount: 0.25, from: "random" },
      y: 0,
      opacity: 1,
    });

    if (location.pathname === "/") return;
    scrollTl.to(letters, {
      duration: 0.5,
      ease: "sine.inOut",
      stagger: { amount: -0.15, from: "random" },
      y: 75,
      scrollTrigger: {
        trigger: ".page-container-scroll-trigger",
        start: "top top",
        end: "center 30%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div ref={container} className="logo-animation-wrapper">
      <img className="logo-animation-letter" src={D} alt="D" />
      <img className="logo-animation-letter" src={O} alt="O" />
      <img className="logo-animation-letter" src={B} alt="B" />
      <img className="logo-animation-letter" src={O} alt="O" />
    </div>
  );
};

export default LogoAnimation;
