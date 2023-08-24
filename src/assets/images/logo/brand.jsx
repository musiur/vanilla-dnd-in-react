import { cn } from "../../../lib/utils";

// eslint-disable-next-line react/prop-types
const BrandLogo = ({ className }) => {
  return (
    <>
      <svg
        className={cn("w-8 h-8", className)}
        viewBox="0 0 250 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10H125C188.513 10 240 61.4873 240 125C240 188.513 188.513 240 125 240H10V10Z"
          fill="white"
          stroke="#8526FD"
          strokeWidth="20"
        />
        <path
          d="M72.5 72.5H125C153.995 72.5 177.5 96.0051 177.5 125C177.5 153.995 153.995 177.5 125 177.5H72.5V72.5Z"
          fill="#8526FD"
          stroke="#E8E8E8"
          strokeWidth="20"
        />
      </svg>
    </>
  );
};

export default BrandLogo;
