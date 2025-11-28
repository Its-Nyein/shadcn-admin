"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowDownToLine,
  CreditCard,
  FileText,
  Link2,
  RefreshCcw,
  Send,
  Settings,
  Shield,
} from "lucide-react";

const actions = [
  {
    label: "Create Invoice",
    icon: FileText,
    description: "Generate new invoice",
    variant: "default" as const,
  },
  {
    label: "Send Payment",
    icon: Send,
    description: "Transfer funds",
    variant: "outline" as const,
  },
  {
    label: "Request Payment",
    icon: ArrowDownToLine,
    description: "Create payment link",
    variant: "outline" as const,
  },
  {
    label: "Add Card",
    icon: CreditCard,
    description: "New payment method",
    variant: "outline" as const,
  },
  {
    label: "Process Refund",
    icon: RefreshCcw,
    description: "Refund transaction",
    variant: "outline" as const,
  },
  {
    label: "Payment Link",
    icon: Link2,
    description: "Share payment URL",
    variant: "outline" as const,
  },
  {
    label: "Security",
    icon: Shield,
    description: "Fraud settings",
    variant: "outline" as const,
  },
  {
    label: "Settings",
    icon: Settings,
    description: "Payment config",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <Card className="border-border/50 shadow-sm transition-shadow hover:shadow-md overflow-hidden min-w-0">
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common payment operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              className="h-auto min-w-0 cursor-pointer flex-col gap-0.5 px-1 py-2 sm:gap-1 sm:px-2 sm:py-4"
            >
              <action.icon className="size-4 sm:size-5" />
              <span className="w-full truncate text-center text-[10px] font-medium sm:text-xs">
                {action.label}
              </span>
              <span
                className={cn(
                  "hidden text-[10px] sm:block",
                  action.variant === "default"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground",
                )}
              >
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
