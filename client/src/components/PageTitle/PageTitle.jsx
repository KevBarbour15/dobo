import "./page-title.css";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PageTitle = ({ title }) => {
  useGSAP(() => {
    let tl = gsap.timeline({ delay: 0.25, ease: "sine.inOut" });
    tl.from(".title", {
      duration: 0.85,
      y: -25,
      opacity: 0,
      ease: "sine.inOut",
      rotationX: -90,
    });
  });

  return (
    <div className="title-container">
      <h2 className="title">{title.toUpperCase()}</h2>
    </div>
  );
};

export default PageTitle;
