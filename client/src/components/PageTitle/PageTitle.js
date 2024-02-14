import "./page-title.css";

import useFadeIn from "../../animation-hooks/fadeIn.js";

const PageTitle = ({ title, thumbnail }) => {
  useFadeIn(true, ".title", 1);
  useFadeIn(true, ".title-img", 1);
  return (
    <div className="title-container">
      <div className={"title-img"}>
        <img src={thumbnail} alt="img" />
      </div>
      <div className="title">{title.toUpperCase()}</div>
    </div>
  );
};

export default PageTitle;
