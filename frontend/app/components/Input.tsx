import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

/**
 * Custom Input Handling Interface
 */
interface InputI<T extends FieldValues> {
  placeholder: string;
  errorMessage: string;
  inputName: Path<T>;
  inputType: "text" | "password" | "email";
  labelClass: string;
  label: string;
  register: UseFormRegister<T>;
}

/**
 * Input Component
 */
const Input = <T extends FieldValues>({
  placeholder,
  errorMessage,
  inputName,
  inputType,
  labelClass,
  label,
  register,
}: InputI<T>) => {
  return (
    <>
      <label htmlFor={inputName} className={labelClass}>
        {label}
      </label>
      <input
        id={inputName}
        type={inputType}
        placeholder={placeholder}
        {...register(inputName, { required: true })}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </>
  );
};

export default Input;
