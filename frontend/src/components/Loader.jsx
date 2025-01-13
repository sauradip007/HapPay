import { Audio } from "react-loader-spinner";

const Loader = ({
  height = 80,
  width = 80,
  color = "green",
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Audio
        height={height}
        width={width}
        radius="9"
        color={color}
        ariaLabel="loading"
      />
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};
export default Loader;
