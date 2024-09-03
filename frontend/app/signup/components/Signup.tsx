"use client";

import Label from "@/app/components/Label";
import { useSignupState } from "../hooks/useSignupState";
import InputWithErrorHandeling from "@/app/components/InputWithErrorHandeling";
import Button from "@/app/components/Button";

export default function Signup() {
  const { isLoading, error, errors, register, onSubmit } = useSignupState();
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-sans font-bold text-center text-primary mb-6">
          Sign up
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="mb-4">
            <Label
              label="Username"
              className="block font-sans font-semibold text-lg text-primary mb-2"
            />
            <InputWithErrorHandeling
              errorMessage={errors.username?.message || ""}
              inputName="username"
              placeholder="username..."
              register={register}
              inputType="text"
            />
          </div>

          <div className="mb-4">
            <Label
              label="Email"
              className="block font-sans font-semibold text-lg text-primary mb-2"
            />
            <InputWithErrorHandeling
              errorMessage={errors.username?.message || ""}
              inputName="email"
              placeholder="email@example.com"
              register={register}
              inputType="email"
            />
          </div>

          <div className="mb-6">
            <Label
              label="Password"
              className="block font-sans font-semibold text-lg text-primary mb-2"
            />
            <InputWithErrorHandeling
              errorMessage={errors.password?.message || ""}
              inputName="password"
              placeholder="password"
              register={register}
              inputType="password"
            />
          </div>

          <Button
            className="bg-secondary text-white py-2 px-4 rounded-lg w-1/2 mx-auto hover:bg-opacity-90 transition duration-200"
            loadingClassName="bg-opacity-40"
            title="Signup"
            type="submit"
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
