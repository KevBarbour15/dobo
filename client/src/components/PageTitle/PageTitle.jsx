import "./page-title.scss";

const PageTitle = ({ title }) => {
  return (
    <div className="title-container">
      <h1 className="title">{title.toUpperCase()}</h1>
    </div>
  );
};

export default PageTitle;
