"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

type GatewayStatus = "operational" | "degraded" | "outage";

interface Gateway {
  name: string;
  status: GatewayStatus;
  uptime: number;
  latency: string;
  successRate: number;
  lastIncident?: string;
  logo?: string;
}

const gateways: Gateway[] = [
  {
    name: "Stripe",
    status: "operational",
    uptime: 99.98,
    latency: "45ms",
    successRate: 99.2,
    logo: "S",
  },
  {
    name: "PayPal",
    status: "operational",
    uptime: 99.95,
    latency: "62ms",
    successRate: 98.8,
    logo: "P",
  },
  {
    name: "Square",
    status: "degraded",
    uptime: 98.45,
    latency: "128ms",
    successRate: 96.5,
    lastIncident: "High latency detected",
    logo: "Sq",
  },
  {
    name: "Adyen",
    status: "operational",
    uptime: 99.99,
    latency: "38ms",
    successRate: 99.5,
    logo: "A",
  },
  {
    name: "Braintree",
    status: "operational",
    uptime: 99.92,
    latency: "55ms",
    successRate: 98.9,
    logo: "B",
  },
];

const statusConfig: Record<
  GatewayStatus,
  {
    label: string;
    icon: React.ReactNode;
    className: string;
    badgeClass: string;
  }
> = {
  operational: {
    label: "Operational",
    icon: <CheckCircle2 className="size-4" />,
    className: "text-green-500",
    badgeClass:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  degraded: {
    label: "Degraded",
    icon: <Clock className="size-4" />,
    className: "text-yellow-500",
    badgeClass:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  outage: {
    label: "Outage",
    icon: <XCircle className="size-4" />,
    className: "text-red-500",
    badgeClass:
      "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
};

export function PaymentGatewayStatus() {
  const operationalCount = gateways.filter(
    (g) => g.status === "operational",
  ).length;

  return (
    <Card className="h-full border-border/50 shadow-sm transition-shadow hover:shadow-md overflow-hidden min-w-0">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Payment Gateways</CardTitle>
          <CardDescription>Real-time gateway status</CardDescription>
        </div>
        <Badge
          variant="outline"
          className="shrink-0 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-[10px] sm:text-xs"
        >
          <span className="sm:hidden">
            {operationalCount}/{gateways.length}
          </span>
          <span className="hidden sm:inline">
            {operationalCount}/{gateways.length} Operational
          </span>
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        {gateways.map((gateway) => {
          const status = statusConfig[gateway.status];
          return (
            <div
              key={gateway.name}
              className="space-y-1.5 rounded-lg border p-2 transition-colors hover:bg-muted/30 sm:space-y-2 sm:p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary sm:size-8 sm:text-xs">
                    {gateway.logo}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {gateway.name}
                    </p>
                    {gateway.lastIncident && (
                      <p className="truncate text-[10px] text-yellow-600 dark:text-yellow-400 sm:text-xs">
                        {gateway.lastIncident}
                      </p>
                    )}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0 gap-1 text-[10px] sm:text-xs",
                    status.badgeClass,
                  )}
                >
                  <span className={cn("hidden sm:inline", status.className)}>
                    {status.icon}
                  </span>
                  <span className="hidden sm:inline">{status.label}</span>
                  <span className={cn("sm:hidden", status.className)}>
                    {status.icon}
                  </span>
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 sm:gap-4 sm:pt-2">
                <div>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">
                    Uptime
                  </p>
                  <p className="text-xs font-semibold sm:text-sm">
                    {gateway.uptime}%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">
                    Latency
                  </p>
                  <p className="text-xs font-semibold sm:text-sm">
                    {gateway.latency}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">
                    Success
                  </p>
                  <p className="text-xs font-semibold sm:text-sm">
                    {gateway.successRate}%
                  </p>
                </div>
              </div>
              <div className="pt-0.5 sm:pt-1">
                <Progress
                  value={gateway.successRate}
                  className={cn(
                    "h-1 sm:h-1.5",
                    gateway.status === "operational" && "[&>div]:bg-green-500",
                    gateway.status === "degraded" && "[&>div]:bg-yellow-500",
                    gateway.status === "outage" && "[&>div]:bg-red-500",
                  )}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
