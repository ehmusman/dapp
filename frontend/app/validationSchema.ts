import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z
    .string().min(1)
});

export const signupSchema = z.object({
    username: z.string().min(6).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .max(50),
});
