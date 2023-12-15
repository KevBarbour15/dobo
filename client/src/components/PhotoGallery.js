import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import "../styles/photo-gallery.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const PhotoGallery = ({ photos }) => {
  return (
    <div className="photo-gallery-container">
      <AutoplaySlider
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
      </AutoplaySlider>
    </div>
  );
};

export default PhotoGallery;
