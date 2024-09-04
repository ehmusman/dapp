import React from 'react';
import { render, screen } from "@testing-library/react";
import { useForm, FieldValues } from "react-hook-form";
import Input from '../../app/components/Input'; // Adjust the import path as necessary
import { describe, it, expect } from 'vitest';

describe("Input Component", () => {
  const TestForm = () => {
    const { register } = useForm<{ email: string }>();
    return (
      <Input
        placeholder="Enter your email"
        errorMessage=""
        inputName="email"
        inputType="email"
        labelClass="text-lg"
        label="Email"
        register={register}
      />
    );
  };

  it("should render the input with the correct placeholder", () => {
    render(<TestForm />);
    const inputElement = screen.getByPlaceholderText("Enter your email");
    expect(inputElement).toBeInTheDocument();
  });


  it("should apply the error message if provided", () => {
    const TestFormWithError = () => {
      const { register } = useForm<{ email: string }>();
      return (
        <Input
          placeholder="Enter your email"
          errorMessage="This field is required"
          inputName="email"
          inputType="email"
          labelClass="text-lg"
          label="Email"
          register={register}
        />
      );
    };

    render(<TestFormWithError />);
    const errorElement = screen.getByText("This field is required");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("text-red-500");
  });

  it("should render the input with the correct type", () => {
    render(<TestForm />);
    const inputElement = screen.getByLabelText("Email");
    expect(inputElement).toHaveAttribute("type", "email");
  });

  it("should render without the error class when no error message is provided", () => {
    render(<TestForm />);
    const inputElement = screen.getByLabelText("Email");
    expect(inputElement).toHaveClass("border-gray-300");
    expect(inputElement).not.toHaveClass("border-red-500");
  });

  it("should render with the error class when an error message is provided", () => {
    const TestFormWithError = () => {
      const { register } = useForm<{ email: string }>();
      return (
        <Input
          placeholder="Enter your email"
          errorMessage="This field is required"
          inputName="email"
          inputType="email"
          labelClass="text-lg"
          label="Email"
          register={register}
        />
      );
    };

    render(<TestFormWithError />);
    const inputElement = screen.getByLabelText("Email");
    expect(inputElement).toHaveClass("border-red-500");
  });
});