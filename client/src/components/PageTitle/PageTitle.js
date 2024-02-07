import "./page-title.css";

const PageTitle = ({ title, thumbnail }) => {
  return (
    <div className="title-container">
      <div className={"title-img"}>
        <img src={thumbnail} />
      </div>
      <div className="title">{title.toUpperCase()}</div>
    </div>
  );
};

export default PageTitle;
