"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CircleDollarSign,
  CreditCard,
  RotateCcw,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const paymentMetrics = [
  {
    title: "Total Revenue",
    current: "$847,234.89",
    previous: "$762,140.52",
    growth: 11.2,
    icon: CircleDollarSign,
  },
  {
    title: "Successful Payments",
    current: "12,847",
    previous: "11,234",
    growth: 14.3,
    icon: CreditCard,
  },
  {
    title: "Active Customers",
    current: "8,492",
    previous: "7,841",
    growth: 8.3,
    icon: Users,
  },
  {
    title: "Refunds Processed",
    current: "$12,340.00",
    previous: "$15,892.00",
    growth: -22.3,
    icon: RotateCcw,
  },
];

export function PaymentMetrics() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 @5xl:grid-cols-4">
      {paymentMetrics.map((metric, index) => (
        <Card key={index} className="border">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <metric.icon className="size-6 text-muted-foreground" />
              <Badge
                variant="outline"
                className={cn(
                  metric.growth >= 0
                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400",
                )}
              >
                {metric.growth >= 0 ? (
                  <>
                    <TrendingUp className="me-1 size-3" />+{metric.growth}%
                  </>
                ) : (
                  <>
                    <TrendingDown className="me-1 size-3" />
                    {metric.growth}%
                  </>
                )}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </p>
              <div className="text-2xl font-bold">{metric.current}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>from {metric.previous}</span>
                <ArrowUpRight className="size-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
