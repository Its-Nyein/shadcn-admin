import { z } from "zod";
import { PASSWORD_REGEX } from "./password-validation";

export const signIn1Schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      PASSWORD_REGEX,
      "Password must contain uppercase, lowercase, number, and special character (!@#$%^&*)",
    ),
  rememberMe: z.boolean().optional(),
});

export type SignIn1Schema = z.infer<typeof signIn1Schema>;
