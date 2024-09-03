"use client";

import { useSignupState } from "./hooks/useSignupState";

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
            <label
              htmlFor="username"
              className="block font-sans font-semibold text-lg text-primary mb-2"
            >
              Username:
            </label>
            <input
              {...register("username", { required: true })}
              className={`py-2 px-3 w-full border rounded-lg focus:outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="username..."
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-sans font-semibold text-lg text-primary mb-2"
            >
              Email:
            </label>
            <input
              {...register("email", { required: true })}
              className={`py-2 px-3 w-full border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-sans font-semibold text-lg text-primary mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`py-2 px-3 w-full border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`${
              isLoading ? "bg-opacity-40" : ""
            } bg-secondary text-white py-2 px-4 rounded-lg w-1/2 mx-auto hover:bg-opacity-90 transition duration-200`}
            disabled={isLoading}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
