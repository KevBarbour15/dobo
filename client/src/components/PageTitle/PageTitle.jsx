import "./page-title.css";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn.js";

const PageTitle = ({ title }) => {
  useFadeIn(true, ".title", .5, 0.05, 25);

  return (
    <div className="title-container">
      <div className="title">{title.toUpperCase()}</div>
    </div>
  );
};

export default PageTitle;
