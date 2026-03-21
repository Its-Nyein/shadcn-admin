import { z } from "zod";
import { PASSWORD_REGEX } from "./password-validation";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      PASSWORD_REGEX,
      "Password must contain uppercase, lowercase, number, and special character (!@#$%^&*)",
    ),
});

export type SignInSchema = z.infer<typeof signInSchema>;
