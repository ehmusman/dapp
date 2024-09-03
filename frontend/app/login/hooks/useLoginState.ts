import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signinSchema } from "../../validationSchema";
import { useContext, useState } from "react";
import UserContext from "@/app/context/user/context";

type SigninFormData = z.infer<typeof signinSchema>;

export const useLoginState = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });
  const context = useContext(UserContext);

  const { isLoading, error } = context?.state!;

  const onSubmit = handleSubmit(async (data) => {
    context?.loginUser(data.email, data.password);
  });
  return {
    isLoading,
    error,
    onSubmit,
    register,
    errors,
  };
};
