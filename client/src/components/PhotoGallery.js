import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import "../styles/photo-gallery.css";


const PhotoGallery = ({ photos }) => {
  return (
    <div className="photo-gallery-container">
      <AwesomeSlider
        play={false}
        bullets={false}
        buttons={true}
        autoplay={false}
        transitionDelay={100}
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
