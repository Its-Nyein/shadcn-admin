"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "$54,230",
    description: "Monthly revenue",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
    footer: "Trending up this month",
    subfooter: "Revenue for the last 6 months",
  },
  {
    title: "Active Customers",
    value: "2,350",
    description: "Total active users",
    change: "+5.2%",
    trend: "up",
    icon: Users,
    footer: "Strong user retention",
    subfooter: "Engagement exceeds targets",
  },
  {
    title: "Total Orders",
    value: "1,247",
    description: "Orders this month",
    change: "-2.1%",
    trend: "down",
    icon: ShoppingCart,
    footer: "Down 2% this period",
    subfooter: "Order volume needs attention",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    description: "Average conversion",
    change: "+8.3%",
    trend: "up",
    icon: BarChart3,
    footer: "Steady performance increase",
    subfooter: "Meets conversion projections",
  },
];

export function MetricsOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 @5xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        const isUp = metric.trend === "up";
        const gradientFrom =
          index % 2 === 0 ? "from-violet-500/5" : "from-fuchsia-500/5";

        return (
          <Card
            key={metric.title}
            className={`@container/card cursor-pointer bg-linear-to-br ${gradientFrom} via-background to-background border-border/50 shadow-sm hover:shadow-md transition-shadow`}
          >
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className={
                    isUp
                      ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                      : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                  }
                >
                  <TrendIcon className="size-3" />
                  {metric.change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.footer}{" "}
                <TrendIcon
                  className={`size-4 ${isUp ? "text-green-500" : "text-red-500"}`}
                />
              </div>
              <div className="text-muted-foreground">{metric.subfooter}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
