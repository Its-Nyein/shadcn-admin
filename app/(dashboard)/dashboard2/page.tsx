import { CustomerInsights } from "@/features/dashboard2/components/customer-insights";
import { MetricsOverview } from "@/features/dashboard2/components/matrics-overview";
import { QuickActions } from "@/features/dashboard2/components/quick-actions";
import { RecentTransactions } from "@/features/dashboard2/components/recent-transactions";
import { RevenueBreakdown } from "@/features/dashboard2/components/revenue-breakdown";
import { SalesChart } from "@/features/dashboard2/components/sale-chart";
import { TopProducts } from "@/features/dashboard2/components/top-products";

export default function Dashboard2() {
  return (
    <div className="flex-1 space-y-6 px-6 py-4">
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Business Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your business performance and key metrics in real-time
          </p>
        </div>
        <QuickActions />
      </div>

      <div className="@container/main space-y-6">
        <MetricsOverview />

        <div className="grid gap-6 grid-cols-1 @5xl:grid-cols-2">
          <SalesChart />
          <RevenueBreakdown />
        </div>

        <div className="grid gap-6 grid-cols-1 @5xl:grid-cols-2">
          <RecentTransactions />
          <TopProducts />
        </div>

        <CustomerInsights />
      </div>
    </div>
  );
}
