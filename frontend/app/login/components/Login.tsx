"use client";
import { useLoginState } from "../hooks/useLoginState";
import Label from "@/app/components/Label";
import InputWithErrorHandeling from "@/app/components/InputWithErrorHandeling";
import Button from "@/app/components/Button";
import CustomLink from "@/app/components/CustomLink";
export default function Login() {
  const { isLoading, register, onSubmit, errors } = useLoginState();
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Login to Your Account
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Label
              label="Email"
              className="block text-gray-700 font-semibold mb-2"
            />
            <InputWithErrorHandeling
              inputType="text"
              errorMessage={errors.email?.message || ""}
              inputName="email"
              placeholder="Email"
              register={register}
            />
          </div>
          <div className="mb-6">
            <Label
              label="Password"
              className="block text-gray-700 font-semibold mb-2"
            />
            <InputWithErrorHandeling
              inputType="password"
              errorMessage={errors.password?.message || ""}
              inputName="password"
              placeholder="Password"
              register={register}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-200"
            loadingClassName="bg-opacity-50"
            isLoading={isLoading}
            title="Login"
          />
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <CustomLink
              href="signup"
              text="Sign up"
              className="text-primary font-semibold hover:underline"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
