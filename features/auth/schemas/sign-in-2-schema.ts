import { z } from "zod";
import { PASSWORD_REGEX } from "./password-validation";

export const signIn2Schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      PASSWORD_REGEX,
      "Password must contain uppercase, lowercase, number, and special character (!@#$%^&*)",
    ),
});

export type SignIn2Schema = z.infer<typeof signIn2Schema>;
