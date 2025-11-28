"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const hourlyData = [
  { hour: "00:00", payments: 45, volume: 12400 },
  { hour: "02:00", payments: 23, volume: 6800 },
  { hour: "04:00", payments: 12, volume: 3200 },
  { hour: "06:00", payments: 34, volume: 9100 },
  { hour: "08:00", payments: 89, volume: 24500 },
  { hour: "10:00", payments: 156, volume: 42800 },
  { hour: "12:00", payments: 178, volume: 48900 },
  { hour: "14:00", payments: 189, volume: 51200 },
  { hour: "16:00", payments: 167, volume: 45600 },
  { hour: "18:00", payments: 198, volume: 54300 },
  { hour: "20:00", payments: 145, volume: 39800 },
  { hour: "22:00", payments: 87, volume: 23900 },
];

const regionData = [
  { region: "North America", payments: 4521, volume: 892340, growth: 12.4 },
  { region: "Europe", payments: 3245, volume: 645890, growth: 8.7 },
  { region: "Asia Pacific", payments: 2876, volume: 523400, growth: 23.5 },
  { region: "Latin America", payments: 1234, volume: 234560, growth: 15.2 },
  { region: "Middle East", payments: 876, volume: 178900, growth: 31.8 },
  { region: "Africa", payments: 432, volume: 89340, growth: 45.2 },
];

const failureReasonsData = [
  { reason: "Insufficient Funds", count: 234, percentage: 35.2 },
  { reason: "Card Declined", count: 187, percentage: 28.1 },
  { reason: "Expired Card", count: 98, percentage: 14.7 },
  { reason: "Invalid CVV", count: 67, percentage: 10.1 },
  { reason: "Network Error", count: 45, percentage: 6.8 },
  { reason: "Other", count: 34, percentage: 5.1 },
];

const chartConfig = {
  payments: {
    label: "Payments",
    color: "var(--chart-1)",
  },
  volume: {
    label: "Volume",
    color: "var(--chart-2)",
  },
};

const regionColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--muted-foreground)",
];

export function PaymentAnalytics() {
  return (
    <Card className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>Payment Analytics</CardTitle>
        <CardDescription>
          Detailed breakdown of payment patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly" className="space-y-4">
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger
              value="hourly"
              className="cursor-pointer text-xs sm:text-sm"
            >
              Hourly
            </TabsTrigger>
            <TabsTrigger
              value="regions"
              className="cursor-pointer text-xs sm:text-sm"
            >
              Regions
            </TabsTrigger>
            <TabsTrigger
              value="failures"
              className="cursor-pointer text-xs sm:text-sm"
            >
              Failures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="space-y-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="rounded-lg border p-2 sm:p-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Peak Hour
                </p>
                <p className="text-lg font-bold sm:text-2xl">2:00 PM</p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  189 transactions
                </p>
              </div>
              <div className="rounded-lg border p-2 sm:p-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Low Activity
                </p>
                <p className="text-lg font-bold sm:text-2xl">4:00 AM</p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  12 transactions
                </p>
              </div>
              <div className="rounded-lg border p-2 sm:p-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Avg/Hour
                </p>
                <p className="text-lg font-bold sm:text-2xl">110</p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  transactions
                </p>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="h-[200px] w-full sm:h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData} margin={{ left: -20, right: 5 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted/30"
                  />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    width={40}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="payments"
                    stroke="var(--color-payments)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-payments)",
                      strokeWidth: 0,
                      r: 3,
                    }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <div className="hidden sm:block">
              <ChartContainer config={chartConfig} className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regionData}
                    layout="vertical"
                    margin={{ left: -10, right: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted/30"
                    />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis
                      type="category"
                      dataKey="region"
                      tick={{ fontSize: 10 }}
                      width={85}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => value?.toLocaleString()}
                        />
                      }
                    />
                    <Bar dataKey="payments" radius={[0, 4, 4, 0]}>
                      {regionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={regionColors[index]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {regionData.map((region, index) => (
                <div
                  key={region.region}
                  className="flex items-center justify-between rounded-lg border p-2 sm:p-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="size-2.5 shrink-0 rounded-full sm:size-3"
                      style={{ backgroundColor: regionColors[index] }}
                    />
                    <div>
                      <p className="text-xs font-medium sm:text-sm">
                        {region.region}
                      </p>
                      <p className="text-[10px] text-muted-foreground sm:text-xs">
                        {region.payments.toLocaleString()} payments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold sm:text-sm">
                      ${(region.volume / 1000).toFixed(0)}k
                    </p>
                    <p className="text-[10px] text-green-500 sm:text-xs">
                      +{region.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="failures" className="space-y-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-2 sm:p-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Total Failures
                </p>
                <p className="text-lg font-bold text-red-500 sm:text-2xl">
                  665
                </p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Last 30 days
                </p>
              </div>
              <div className="rounded-lg border p-2 sm:p-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Failure Rate
                </p>
                <p className="text-lg font-bold sm:text-2xl">1.8%</p>
                <p className="hidden text-xs text-green-500 sm:block">
                  -0.3% from last month
                </p>
              </div>
              <div className="rounded-lg border p-2 sm:p-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Top Issue
                </p>
                <p className="text-lg font-bold sm:text-2xl">Funds</p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  35.2% of failures
                </p>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {failureReasonsData.map((item) => (
                <div
                  key={item.reason}
                  className="flex items-center gap-2 rounded-lg border p-2 sm:gap-4 sm:p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-xs font-medium sm:text-sm">
                        {item.reason}
                      </p>
                      <p className="ml-2 shrink-0 text-xs font-semibold sm:text-sm">
                        {item.count}
                      </p>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted sm:mt-2 sm:h-2">
                      <div
                        className="h-full rounded-full bg-red-500/70"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <p className="shrink-0 text-xs text-muted-foreground sm:text-sm">
                    {item.percentage}%
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
