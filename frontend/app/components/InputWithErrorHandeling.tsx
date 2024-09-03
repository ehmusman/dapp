import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

/**
 * Custom Input Handeline Interface
 */
interface InputWithErrorHandelingI<T extends FieldValues> {
  placeholder: string;
  errorMessage: string;
  inputName: Path<T>;
  inputType: "text" | "password" | "email";
  register: UseFormRegister<T>;
}

/**
 *
 * @param param0 string
 * @param param1 string
 * @param param2 string
 * @param param3 string
 * @param param4 {}
 * @returns
 */
const InputWithErrorHandeling = <T extends FieldValues>({
  placeholder = "Email",
  errorMessage = "",
  inputName,
  inputType = "email",
  register,
}: InputWithErrorHandelingI<T>) => {
  return (
    <>
      <input
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

export default InputWithErrorHandeling;
