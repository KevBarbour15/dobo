import "./page-title.css";

const PageTitle = ({ title }) => {
  return (
    <div className="title-container">
      <div className={`title-img ${title}`}></div>
      <div className="title">{title}</div>
    </div>
  );
};

export default PageTitle;