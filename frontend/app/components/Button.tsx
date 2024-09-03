import React from "react";

/**
 * Button Component Interface
 */
interface ButtonI {
  isLoading?: boolean;
  type: "submit" | "reset" | "button" | undefined;
  title: string;
  className: string;
  loadingClassName?: string;
  onClick?: () => void;
}

/**
 *
 * @param param0 string
 * @param param1 string
 * @param param2 string
 * @param param3 string
 * @param param4 string
 * @param param5 ()=>void
 * @returns
 */
const Button = ({
  type = "button",
  title = "Logout",
  className = "text-white hover:bg-secondary px-3 py-2 rounded",
  isLoading,
  loadingClassName,
  onClick,
}: ButtonI) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${isLoading ? loadingClassName : ""} ${className}`}
      disabled={isLoading}
    >
      {title}
    </button>
  );
};

export default Button;
