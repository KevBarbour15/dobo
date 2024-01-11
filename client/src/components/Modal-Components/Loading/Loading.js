import "./loading.css";
import { Grid } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-container">
      <Grid color="#bd9c72" />
    </div>
  );
};

export default Loading;
