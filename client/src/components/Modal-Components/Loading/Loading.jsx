import "./loading.css";
import { Grid } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-container">
      <Grid color="black" />
    </div>
  );
};

export default Loading;
