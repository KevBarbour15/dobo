import "./page-title.css";

import useSlideIn from "../../animation-hooks/slideIn.js";
import useFadeIn from "../../animation-hooks/fadeIn.js";

const PageTitle = ({ title, thumbnail }) => {
  useSlideIn(".title", 1.25);
  useFadeIn(true, ".title-img", 1.25);
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
