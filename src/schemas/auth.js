import { z } from "zod";

export const loginBodySchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(100),
  password: z.string().min(2, "Password is required"),
});

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(100),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(200),
    passwordConf: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConf, {
    message: "Passwords do not match",
    path: ["passwordConf"],
  })
  .transform(({ username, password }) => ({ username, password }));
