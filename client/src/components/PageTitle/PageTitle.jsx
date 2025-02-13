import "./page-title.scss";
import { MoveDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PageTitle = ({ title }) => {
  const container = useRef(null);
  const [iconSize, setIconSize] = useState(40);

  useEffect(() => {
    setIconSize(window.innerWidth < 768 ? 32 : 48);
  }, []);

  useGSAP(() => {
    if (!container.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      ease: "linear",
    });

    tl.fromTo(
      ".scroll-down-icon",
      { y: -100 },
      {
        duration: 1.5,
        y: 115,
      }
    );
  }, []);

  return (
    <div ref={container} className="title-container">
      <h2 className="title">{title}</h2>
      <div className="scroll-down-container">
        <MoveDown
          className="scroll-down-icon"
          strokeWidth={1.25}
          size={iconSize}
        />
      </div>
      <div className="title-wrapper-line"></div>
    </div>
  );
};

export default PageTitle;
