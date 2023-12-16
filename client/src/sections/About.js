import "../styles/about.css";
import PhotoGallery from "../components/PhotoGallery";
import { photoArray1 } from "../assets/images/photoArrays";

const About = () => {
  return (
    <div id="about" className="about-container">
      <div className="about-left">
        <div className="about-info-container">
          <div className="about-title">About</div>
          <div className="about-text">
            <p>This is all placeholder shit, you can write whatever here</p>
            <p>
              ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              sit amet lacus ac magna efficitur suscipit. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Donec et odio in libero vulputate fermentum. Nullam a turpis at
              sem auctor commodo. Morbi ac sem vitae dolor aliquam hendrerit.
              Maecenas in libero ut odio facilisis consectetur. Fusce sit amet
              quam nec arcu molestie cursus.
            </p>
            <p>
              Mauris ullamcorper, massa non ullamcorper sagittis, leo massa
              mollis lorem, id efficitur libero erat a diam. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia curae; Proin vel urna sit amet
              lorem vulputate aliquet. Quisque sodales, ex in mollis
              ullamcorper, lorem leo vehicula magna, eget hendrerit est tellus
              sit amet nunc.
            </p>
            <p>
              Mauris ullamcorper, massa non ullamcorper sagittis, leo massa
              mollis lorem, id efficitur libero erat a diam. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia curae; Proin vel urna sit amet
              lorem vulputate aliquet. Quisque sodales, ex in mollis
              ullamcorper, lorem leo vehicula magna, eget hendrerit est tellus
              sit amet nunc.
            </p>
          </div>
        </div>
      </div>
      <div className="about-right">
        <div className="image-container">
          <PhotoGallery photos={photoArray1} />
        </div>
      </div>
    </div>
  );
};

export default About;
