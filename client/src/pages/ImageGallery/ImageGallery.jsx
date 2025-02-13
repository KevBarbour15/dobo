import { useState, useEffect } from "react";
import "./image-gallery.scss";
import PhotoAlbum from "react-photo-album";
import { images } from "./imageArray.js";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Loading from "../../components/Modal-Components/Loading/Loading.jsx";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ImageGallery = () => {
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const [maxPhotos, setMaxPhotos] = useState(window.innerWidth <= 768 ? 2 : 3);

  useEffect(() => {
    const handleResize = () => {
      setMaxPhotos(window.innerWidth <= 768 ? 2 : 3);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, []);

  useGSAP(() => {
    if (loaded) {
      setTimeout(() => {
        let tl = gsap.timeline({ delay: 0.5 });
        tl.set(".gallery-container img", {
          x: (i) => {
            i = i % 2 === 0 ? 250 : -250;
            return (Math.random() - 0.5) * i;
          },
          y: (i) => {
            i = i % 2 === 0 ? 250 : -250;
            return (Math.random() - 0.75) * i;
          },
          opacity: 0,
        }).to(".gallery-container img", {
          opacity: 1,
          stagger: 0.1,
          delay: 0.15,
          duration: 0.5,
          ease: "sine.out",
          x: 0,
          y: 0,
        });
      }, 0.5);
    }
  }, [loaded]);

  return (
    <>
      {!loaded ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <div className="gallery-container">
          <div className="container">
            <PhotoAlbum
              photos={images}
              onClick={({ index }) => setIndex(index)}
              layout="rows"
              rowConstraints={{
                maxPhotos: maxPhotos,
              }}
            />

            <Lightbox
              slides={images}
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              plugins={[Thumbnails]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
