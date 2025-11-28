"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Transactions",
    value: "12,847",
    change: 14.3,
    icon: DollarSign,
    description: "Last 30 days",
  },
  {
    title: "Successful",
    value: "12,612",
    change: 15.2,
    icon: CheckCircle2,
    iconColor: "text-green-500",
    description: "98.2% success rate",
  },
  {
    title: "Pending",
    value: "156",
    change: -8.4,
    icon: Clock,
    iconColor: "text-yellow-500",
    description: "Awaiting processing",
  },
  {
    title: "Failed",
    value: "79",
    change: -22.1,
    icon: XCircle,
    iconColor: "text-red-500",
    description: "0.6% failure rate",
  },
];

export function TransactionsStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 @5xl:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <stat.icon
                className={cn("size-6 text-muted-foreground", stat.iconColor)}
              />
              <Badge
                variant="outline"
                className={cn(
                  stat.change >= 0
                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/20 dark:text-green-400"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400",
                )}
              >
                {stat.change >= 0 ? (
                  <>
                    <TrendingUp className="mr-1 size-3" />+{stat.change}%
                  </>
                ) : (
                  <>
                    <TrendingDown className="mr-1 size-3" />
                    {stat.change}%
                  </>
                )}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
