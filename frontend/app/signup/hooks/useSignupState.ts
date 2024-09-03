import { useForm } from "react-hook-form";
import { signupSchema } from "../../validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import UserContext from "../../context/user/context";

type SignupFormData = z.infer<typeof signupSchema>;

export const useSignupState = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const context = useContext(UserContext);
  const { isLoading, error } = context?.state!;
  const onSubmit = handleSubmit(async (data) => {
    context?.signupUser(data.username, data.email, data.password);
  });
  return {
    isLoading,
    error,
    errors,
    register,
    onSubmit,
  };
};
