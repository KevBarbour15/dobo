import { useState, useEffect } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// fade in the element and fade the title to white for better contrast on splash image load
const useFadeIn = (element, duration, delay, image) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = image;
    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageLoaded(false);
    };
  }, [image]);

  useGSAP(() => {
    if (!imageLoaded) return;

    // Get the actual height of the title container
    const titleContainer = document.querySelector(".title-container");
    const titleHeight = titleContainer.scrollHeight;

    const split = new SplitText(".title", { type: "chars" });

    split.chars.forEach((char) => {
      gsap.set(char, {
        y: -150,
      });
    });

    let tl = gsap.timeline({ delay: delay, duration: duration });
    tl.set(".title", { left: "0%", xPercent: 0 })
      .to(
        element,
        {
          opacity: 1,
          duration: 0.25,
        },
        0
      )
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
          duration: 0.5,
          maxHeight: "100%",
        },
        "<"
      )
      .to(
        ".splash-image-container",
        {
          height: `calc(100svh - ${titleHeight}px)`,
          duration: 0.5,
          ease: "sine.out",
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
  }, [imageLoaded, element, duration, delay, image]);
};

export default useFadeIn;
