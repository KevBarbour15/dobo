import { useState } from "react";
import "./image-gallery.css";
import { imageArray } from "../../assets/images/imageArray.js";
import { thumbnailArray } from "../../assets/thumbnail-images/thumbnailArray.js";
import Masonry from "react-masonry-css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ImageGallery = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="gallery-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {thumbnailArray.map((thumbnail, index) => (
          <div
            className="masonry-image"
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          >
            <img src={thumbnail} alt="dobo" />
          </div>
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          mainSrc={imageArray[photoIndex]}
          nextSrc={imageArray[(photoIndex + 1) % imageArray.length]}
          prevSrc={
            imageArray[
              (photoIndex + imageArray.length - 1) % imageArray.length
            ]
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
