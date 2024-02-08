import "./page-title.css";

import useSlideIn from "../../animation-hooks/slideIn.js";

const PageTitle = ({ title, thumbnail }) => {
  useSlideIn(".title-container", 1.25);
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
