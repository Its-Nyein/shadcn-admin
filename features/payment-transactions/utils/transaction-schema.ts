import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  reference: z.string(),
  customer: z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
  }),
  amount: z.number(),
  currency: z.string(),
  status: z.enum([
    "completed",
    "pending",
    "processing",
    "failed",
    "refunded",
    "disputed",
  ]),
  method: z.enum([
    "credit_card",
    "debit_card",
    "bank_transfer",
    "digital_wallet",
    "crypto",
    "ach",
  ]),
  gateway: z.string(),
  country: z.string(),
  createdAt: z.string(),
  completedAt: z.string().optional(),
  fee: z.number(),
  net: z.number(),
  riskScore: z.number(),
  description: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
