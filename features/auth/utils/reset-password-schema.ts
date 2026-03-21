import { z } from "zod";
import { PASSWORD_REGEX } from "./password-validation";

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const passwordSchema = z
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

export type EmailSchema = z.infer<typeof emailSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
