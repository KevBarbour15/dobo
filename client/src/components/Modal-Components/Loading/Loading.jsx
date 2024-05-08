import "./loading.scss";
import { Grid } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-container">
      <Grid color="black" height={125} width={125} />
    </div>
  );
};

export default Loading;
