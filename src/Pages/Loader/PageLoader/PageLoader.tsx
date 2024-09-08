import { RotatingLines } from "react-loader-spinner";

const PageLoader = () => {
  return (
      <RotatingLines
        // height="90"
        width="90"
        // radius="9"
        // color="blue"
        ariaLabel="loading"
      />
  );
};
export default PageLoader;