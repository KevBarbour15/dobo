import { useState, useEffect } from "react";
import "./image-gallery.scss";
import PhotoAlbum from "react-photo-album";
import { images } from "./imageArray.js";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ImageGallery2 = () => {
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imageElements = images.map((image) => {
      const img = new Image();
      img.src = image.src;
      return img;
    });

    const checkImagesLoaded = () => {
      const allImagesLoaded = imageElements.every((img) => img.complete);
      if (allImagesLoaded) {
        setLoaded(true);
      }
    };

    imageElements.forEach((img) => {
      img.onload = checkImagesLoaded;
      img.onerror = checkImagesLoaded;
    });

    // Check initially in case some images are already cached
    checkImagesLoaded();
  }, [images]);

  useGSAP(() => {
    if (!loaded) return;
    gsap.set(".gallery-container img", {
      opacity: 1,
    });
    gsap.from(".react-photo-album--row", {
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      delay: 0.25,
      ease: "sine.out",
      x: function (i) {
        return i % 2 === 0 ? 150 : -150;
      },
    });
  }, [loaded]);

  return (
    <div className="gallery-container">
      <PhotoAlbum
        photos={images}
        onClick={({ index }) => setIndex(index)}
        layout="rows"
      />

      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails]}
      />
    </div>
  );
};

export default ImageGallery2;
