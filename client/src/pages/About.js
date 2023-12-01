import React from "react";
import Layout from "../components/Layout";
import "../styles/about.css";

const About = () => {
  return (
    <Layout>
      <div className="about-container">
        <div className="about-left">
          <div className="about-text">
            <h1>What is Dobo?</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet lacus ac magna efficitur suscipit. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Donec et odio in libero vulputate fermentum. Nullam a turpis at
              sem auctor commodo. Morbi ac sem vitae dolor aliquam hendrerit.
              Maecenas in libero ut odio facilisis consectetur. Fusce sit amet
              quam nec arcu molestie cursus. Mauris ullamcorper, massa non
              ullamcorper sagittis, leo massa mollis lorem, id efficitur libero
              erat a diam. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Proin vel urna sit amet lorem vulputate aliquet. Quisque sodales,
              ex in mollis ullamcorper, lorem leo vehicula magna, eget hendrerit
              est tellus sit amet nunc.
            </p>
          </div>
        </div>
        <div className="about-right">
          <div className="about-image-container">
            {/* no image goes here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
