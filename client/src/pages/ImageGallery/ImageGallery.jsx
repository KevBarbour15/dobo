import { useEffect, useState } from "react";
import "./image-gallery.scss";
import PhotoAlbum from "react-photo-album";

// image imports
import { imageArray } from "./imageArray.js";

// component imports
import Masonry from "react-masonry-css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ImageGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (loadedCount !== imageArray.length) return;
    gsap.set(".masonry-image", {
      opacity: 0,
      y: 50,
    });
    gsap.to(".masonry-image", {
      opacity: 1,
      stagger: 0.025,
      ease: "slow(0.1, 0.1, false)",
      scale: 1,
      y: 0,
    });
  }, [loadedCount]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 2,
  };

  return (
    <div className="gallery-container">
      {/*  <PhotoAlbum layout="rows" photos={images} />    */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {imageArray.map((thumbnail, index) => (
          <div
            key={"thumbnail-" + index}
            className="masonry-image"
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          >
            <img
              src={thumbnail}
              alt="dobo"
              lazy="loading"
              onLoad={(e) => {
                e.target.classList.add("image-loaded");
                setLoadedCount((prevCount) => prevCount + 1);
              }}
            />
          </div>
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          mainSrc={imageArray[photoIndex]}
          nextSrc={imageArray[(photoIndex + 1) % imageArray.length]}
          prevSrc={
            imageArray[(photoIndex + imageArray.length - 1) % imageArray.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + imageArray.length - 1) % imageArray.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % imageArray.length)
          }
        />
      )}
    </div>
  );
};

export default ImageGallery;
