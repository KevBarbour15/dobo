import "./page-title.scss";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const PageTitle = ({ title }) => {
  useGSAP(() => {
    let tl = gsap.timeline({ delay: 0.5, ease: "sine.inOut" });
    tl.from(".title", {
      duration: 0.75,
      opacity: 0,
      rotationX: 90,
    });
  });

  return (
    <div className="title-container">
      <h2 className="title">{title.toUpperCase()}</h2>
    </div>
  );
};

export default PageTitle;
