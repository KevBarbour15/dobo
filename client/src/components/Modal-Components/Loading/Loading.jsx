import "./loading.scss";
import { Grid } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-container">
      <Grid color="grey" height={100} width={100} />
    </div>
  );
};

export default Loading;
