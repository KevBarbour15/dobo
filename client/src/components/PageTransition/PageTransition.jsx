import "./page-transition.scss";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PageTransition = () => {
  useGSAP(() => {
    let tl = gsap.timeline({ ease: "sine.inOut", blur: 0 });
    tl.to(
      ".page-transition",
      {
        //duration: 1.75,
        //blur: 0,
      },
      0
    );
  });

  return <div className="page-transition"></div>;
};

export default PageTransition;
