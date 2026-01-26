import { TransactionsStats } from "@/features/payment-transactions/components/transactions-stats";
import { TransactionsTable } from "@/features/payment-transactions/components/transactions-table";
import { transactions } from "@/features/payment-transactions/utils/transaction-data";

export default function PaymentTransactionsPage() {
  return (
    <>
      <div className="px-4 lg:px-6 py-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Payment Transactions
        </h1>
        <p className="text-muted-foreground">
          View and manage all payment transactions across your platform.
        </p>
      </div>

      <div className="@container/main px-4 lg:px-6 space-y-6">
        <TransactionsStats />
        <TransactionsTable data={transactions} />
      </div>
    </>
  );
}
