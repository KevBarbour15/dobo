import "./page-title.scss";

const PageTitle = ({ title }) => {
  return (
    <div className="title-container">
      <h2 className="title">{title}</h2>
      <h2 className="title-dark">{title}</h2>
    </div>
  );
};

export default PageTitle;
