import { useEffect, useState } from "react";
import imageArray from "../../assets/images/imageArray.js";

const ImageContainer = () => {
  const [image, setImage] = useState("");
  
  useEffect(() => {
    // pick a random photo
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    setImage(imageArray[randomIndex]);
  }, [imageArray]);

  return (
    <div className="image-container">
      <img src={image} alt="image" />
    </div>
  );
};

export default ImageContainer;
