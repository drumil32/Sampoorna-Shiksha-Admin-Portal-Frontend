import { ThreeDots } from "react-loader-spinner";

function ButtonLoader() {
  return (
        <ThreeDots
            visible={true}
            height="36"
            width="36"
            color="green"
            // strokeWidth="5"
            // animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
  )
}

export default ButtonLoader