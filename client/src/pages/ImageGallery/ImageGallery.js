import { useState } from "react";
import "./image-gallery.css";
import { imageArray } from "../../assets/images/imageArray.js";
import { thumbnailArray } from "../../assets/thumbnail-images/thumbnailArray.js";
import Masonry from "react-masonry-css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import useAnimateImages from "../../animation-hooks/animateImages.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const ImageGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // animate images populating the gallery
  useFadeIn(true, ".masonry-grid", 0.5, 0);
  useAnimateImages(true,".masonry-image");

  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    700: 3,
    500: 2,
  };

  return (
    <div className="gallery-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {thumbnailArray.map((thumbnail, index) => (
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
              onLoad={(e) => e.target.classList.add("image-loaded")}
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
