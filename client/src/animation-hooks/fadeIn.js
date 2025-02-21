import { useState, useEffect } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// fade in the element and fade the title to white for better contrast on splash image load
const useFadeIn = (element, duration, delay, image) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = image;
    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageLoaded(false);
      console.log("Error loading image.");
    };
  }, []);

  useGSAP(() => {
    if (!imageLoaded) return;

    let tl = gsap.timeline({ delay: delay, duration: duration });
    tl.to(
      element,
      {
        opacity: 1,
        duration: 0.25,
      },
      0
    );
  }, [imageLoaded, element, duration, delay]);
};

export default useFadeIn;
