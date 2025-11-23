import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";

const performanceMetrics = [
  {
    title: "Total Revenue",
    current: "$1,250",
    previous: "$1,112",
    growth: 12.5,
    icon: DollarSign,
  },
  {
    title: "New Customers",
    current: "1,234",
    previous: "1,542",
    growth: -20.0,
    icon: UserPlus,
  },
  {
    title: "Active Accounts",
    current: "45,678",
    previous: "40,602",
    growth: 12.5,
    icon: Users,
  },
  {
    title: "Growth Rate",
    current: "4.5%",
    previous: "4.3%",
    growth: 4.5,
    icon: Activity,
  },
];

export function SectionCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {performanceMetrics.map((metric, index) => (
        <Card key={index} className="border">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <metric.icon className="text-muted-foreground size-6" />
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
              <p className="text-muted-foreground text-sm font-medium">
                {metric.title}
              </p>
              <div className="text-2xl font-bold">{metric.current}</div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
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
