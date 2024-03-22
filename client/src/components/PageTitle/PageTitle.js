import "./page-title.css";

import useFadeIn from "../../animation-hooks/fadeIn.js";

const PageTitle = ({ title }) => {
  useFadeIn(true, ".title", 1, 0.05, 35);

  return (
    <div className="title-container">
      <div className="title">{title.toUpperCase()}</div>
    </div>
  );
};

export default PageTitle;
