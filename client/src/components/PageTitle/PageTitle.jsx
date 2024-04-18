import "./page-title.css";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn.js";

const PageTitle = ({ title }) => {
  useFadeIn(true, ".title", .5, 0.05, 25);
  

  return (
    <div className="title-container">
      <h2 className="title">{title.toUpperCase()}</h2>
    </div>
  );
};

export default PageTitle;
