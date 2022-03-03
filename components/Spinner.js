import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <TailSpin color="#333333" height={100} width={100} />
    </div>
  );
};

export default Spinner;
