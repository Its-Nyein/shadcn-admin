import { z } from "zod";
import { PASSWORD_REGEX } from "./password-validation";

export const identifySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z.string().min(1, "Please enter your username"),
});

export const securityQuestionSchema = z.object({
  question: z.string().min(1, "Please select a security question"),
  answer: z.string().min(1, "Please enter your answer"),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        PASSWORD_REGEX,
        "Password must contain uppercase, lowercase, number, and special character (!@#$%^&*)",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type IdentifySchema = z.infer<typeof identifySchema>;
export type SecurityQuestionSchema = z.infer<typeof securityQuestionSchema>;
export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
