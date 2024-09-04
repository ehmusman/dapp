"use client";
import { useSignupState } from "../hooks/useSignupState";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

export default function Signup() {
  const { isLoading, errors, register, onSubmit } = useSignupState();
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-sans font-bold text-center text-primary mb-6">
          Sign up
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="mb-4">
            <Input
              errorMessage={errors.username?.message || ""}
              inputName="username"
              placeholder="username..."
              register={register}
              inputType="text"
              label="Username"
              labelClass="block font-sans font-semibold text-lg text-primary mb-2"
            />
          </div>

          <div className="mb-4">
            <Input
              errorMessage={errors.username?.message || ""}
              inputName="email"
              placeholder="email@example.com"
              register={register}
              inputType="email"
              label="Email"
              labelClass="block font-sans font-semibold text-lg text-primary mb-2"
            />
          </div>

          <div className="mb-6">
            <Input
              errorMessage={errors.password?.message || ""}
              inputName="password"
              placeholder="password"
              register={register}
              inputType="password"
              label="Password"
              labelClass="block font-sans font-semibold text-lg text-primary mb-2"
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
