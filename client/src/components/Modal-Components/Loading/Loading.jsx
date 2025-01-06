import "./loading.scss";
import { Grid } from "react-loader-spinner";

import { ring } from "ldrs";

ring.register();

const Loading = () => {
  return (
    <div className="loading-container">
      <l-ring
        size="75"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="black"
      ></l-ring>
    </div>
  );
};

export default Loading;
