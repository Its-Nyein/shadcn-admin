import { PaymentAnalytics } from "@/features/payment-dashboard/components/payment-analytics";
import { PaymentGatewayStatus } from "@/features/payment-dashboard/components/payment-gateway-status";
import { PaymentMethodsBreakdown } from "@/features/payment-dashboard/components/payment-methods-breakdown";
import { PaymentMetrics } from "@/features/payment-dashboard/components/payment-metrics";
import { PaymentVolumeChart } from "@/features/payment-dashboard/components/payment-volume-chart";
import { QuickActions } from "@/features/payment-dashboard/components/quick-actions";
import { RecentPayments } from "@/features/payment-dashboard/components/recent-payments";

export default function PaymentDashboardPage() {
  return (
    <>
      <div className="px-4 lg:px-6 py-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Payment Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor transactions, track revenue, and manage payment operations.
        </p>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <PaymentMetrics />
        <QuickActions />
        <div className="grid gap-6 @5xl:grid-cols-2 min-w-0">
          <PaymentVolumeChart />
          <PaymentMethodsBreakdown />
        </div>
        <div className="grid gap-6 @5xl:grid-cols-3 min-w-0">
          <div className="@5xl:col-span-2 min-w-0">
            <RecentPayments />
          </div>
          <PaymentGatewayStatus />
        </div>
        <PaymentAnalytics />
      </div>
    </>
  );
}
