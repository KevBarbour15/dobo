// useAnimateImages.js
import { useEffect } from 'react';
import gsap from 'gsap';

const useAnimateImages = () => {
    useEffect(() => {
      gsap.from(".masonry-image", {
        autoAlpha: 0,
        scale: 0.5,
        stagger: 0.15,
        ease: "power4.inOut",
      });
    }, []);
};



export default useAnimateImages;
