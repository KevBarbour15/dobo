import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import "./photo-gallery.css";


const PhotoGallery = ({ photos }) => {
  return (
    <div className="photo-gallery-container">
      <AwesomeSlider className="photo-gallery-slide"
        play={false}
        bullets={false}
        buttons={true}
        autoplay={false}
        startAt={1}
        cancelOnInteraction={false}
      >
        {photos.map((image, index) => (
          <div className="awssld-content" key={index} data-src={image} />
        ))}
      </AwesomeSlider>
    </div>
  );
};

export default PhotoGallery;
