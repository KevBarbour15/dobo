import { useState } from "react";
import "./image-gallery.css";
import { imagesArray } from "../../assets/images/photoArrays.js";
import Masonry from "react-masonry-css";

const ImageGallery = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="gallery-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {imagesArray.map((image) => (
          <div className="masonry-image" onClick={() => openLightbox(image)}>
            <img src={image} alt="dobo" />
          </div>
        ))}
      </Masonry>

      {lightboxOpen && (
        <div className="lightbox">
          <button onClick={closeLightbox} className="menu-close-button">
            <span className="material-icons">close</span>
          </button>
          <img src={selectedImage} alt="Enlarged view" />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
