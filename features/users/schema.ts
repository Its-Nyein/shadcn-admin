import { z } from "zod";

export const userRoles = [
  "Admin",
  "Editor",
  "Author",
  "Maintainer",
  "Subscriber",
] as const;
export const userPlans = ["Basic", "Professional", "Enterprise"] as const;
export const userBilling = [
  "UPI",
  "Auto Debit",
  "Paypal",
  "Credit Card",
] as const;
export const userStatuses = [
  "Active",
  "Pending",
  "Inactive",
  "Suspended",
] as const;

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string(),
  role: z.string(),
  plan: z.string(),
  billing: z.string(),
  status: z.string(),
  joinedDate: z.string(),
  lastLogin: z.string(),
});

export const userFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
  plan: z.string().min(1, "Please select a plan"),
  billing: z.string().min(1, "Please select a billing method"),
  status: z.string().min(1, "Please select a status"),
});

export type User = z.infer<typeof userSchema>;
export type UserFormValues = z.infer<typeof userFormSchema>;
