"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  Building2,
  CheckCircle2,
  ChevronsUpDown,
  Clock,
  Copy,
  CreditCard,
  ExternalLink,
  MoreHorizontal,
  RefreshCcw,
  ShieldAlert,
  Smartphone,
  Wallet,
  XCircle,
} from "lucide-react";
import type { Transaction } from "../utils/transaction-schema";

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  processing: {
    label: "Processing",
    icon: RefreshCcw,
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  refunded: {
    label: "Refunded",
    icon: RefreshCcw,
    className:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  disputed: {
    label: "Disputed",
    icon: ShieldAlert,
    className:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },
};

const methodIcons = {
  credit_card: CreditCard,
  debit_card: CreditCard,
  bank_transfer: Building2,
  digital_wallet: Wallet,
  crypto: Smartphone,
  ach: Building2,
};

const methodLabels = {
  credit_card: "Credit Card",
  debit_card: "Debit Card",
  bank_transfer: "Bank Transfer",
  digital_wallet: "Digital Wallet",
  crypto: "Crypto",
  ach: "ACH",
};

interface ColumnHeaderProps {
  column: {
    toggleSorting: (desc: boolean) => void;
    getIsSorted: () => false | "asc" | "desc";
  };
  title: string;
}

function ColumnHeader({ column, title }: ColumnHeaderProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-3 h-8 cursor-pointer"
    >
      {title}
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-2 size-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 size-4" />
      ) : (
        <ChevronsUpDown className="ml-2 size-4" />
      )}
    </Button>
  );
}

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reference",
    header: ({ column }) => <ColumnHeader column={column} title="Reference" />,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("reference")}</div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback className="bg-primary/10 text-xs text-primary">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{customer.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {customer.email}
            </p>
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const customer = row.original.customer;
      const searchValue = value.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue)
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <ColumnHeader column={column} title="Amount" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = row.original.amount;
      const currency = row.original.currency;
      const isNegative = amount < 0;
      return (
        <div
          className={cn("text-right font-medium", isNegative && "text-red-500")}
        >
          {isNegative ? "-" : ""}$
          {Math.abs(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {currency}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];
      const Icon = config.icon;
      return (
        <Badge variant="outline" className={cn("gap-1", config.className)}>
          <Icon className="size-3" />
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      const method = row.original.method;
      const Icon = methodIcons[method];
      return (
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <span className="text-sm">{methodLabels[method]}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
    cell: ({ row }) => (
      <div className="text-sm capitalize">{row.getValue("gateway")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "fee",
    header: ({ column }) => (
      <div className="text-right">
        <ColumnHeader column={column} title="Fee" />
      </div>
    ),
    cell: ({ row }) => {
      const fee = row.original.fee;
      const isNegative = fee < 0;
      return (
        <div
          className={cn("text-right text-sm", isNegative && "text-green-500")}
        >
          {isNegative ? "-" : ""}$
          {Math.abs(fee).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "net",
    header: ({ column }) => (
      <div className="text-right">
        <ColumnHeader column={column} title="Net" />
      </div>
    ),
    cell: ({ row }) => {
      const net = row.original.net;
      const isNegative = net < 0;
      return (
        <div
          className={cn("text-right font-medium", isNegative && "text-red-500")}
        >
          {isNegative ? "-" : ""}$
          {Math.abs(net).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div className="text-sm">{row.getValue("country")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-sm">
          <p>{format(date, "MMM dd, yyyy")}</p>
          <p className="text-xs text-muted-foreground">
            {format(date, "HH:mm:ss")}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 cursor-pointer p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
              className="cursor-pointer"
            >
              <Copy className="mr-2 size-4" />
              Copy Transaction ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(transaction.reference)
              }
              className="cursor-pointer"
            >
              <Copy className="mr-2 size-4" />
              Copy Reference
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <ExternalLink className="mr-2 size-4" />
              View Details
            </DropdownMenuItem>
            {transaction.status === "completed" && (
              <DropdownMenuItem className="cursor-pointer">
                <RefreshCcw className="mr-2 size-4" />
                Process Refund
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
