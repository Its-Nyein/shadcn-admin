import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cards = [
  {
    title: "Total Revenue",
    value: "$1,250",
    change: "+12.5%",
    trend: "up" as const,
    footer: "Trending up this month",
    subfooter: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "-20%",
    trend: "down" as const,
    footer: "Down 20% this period",
    subfooter: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    change: "+12.5%",
    trend: "up" as const,
    footer: "Strong user retention",
    subfooter: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    change: "+4.5%",
    trend: "up" as const,
    footer: "Steady performance increase",
    subfooter: "Meets growth projections",
  },
];

export function SectionCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const TrendIcon = card.trend === "up" ? TrendingUp : TrendingDown;
        const isUp = card.trend === "up";
        const gradientFrom =
          index % 2 === 0 ? "from-violet-500/5" : "from-fuchsia-500/5";

        return (
          <Card
            key={card.title}
            className={`@container/card cursor-pointer bg-linear-to-br ${gradientFrom} via-background to-background border-border/50 shadow-sm hover:shadow-md transition-shadow`}
          >
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
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
                  {card.change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.footer}{" "}
                <TrendIcon
                  className={`size-4 ${isUp ? "text-green-500" : "text-red-500"}`}
                />
              </div>
              <div className="text-muted-foreground">{card.subfooter}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
