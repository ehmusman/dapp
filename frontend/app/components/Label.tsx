import React from "react";

/**
 * Label Interface
 */
interface LabelI {
  label: string;
  className: string;
}

/**
 *
 * @param param0 string
 * @param param1 string
 * @returns
 */
const Label = ({ label = "Login", className }: LabelI) => {
  return (
    <label htmlFor={label} className={className}>
      {label}
    </label>
  );
};

export default Label;
