"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DEFAULT_PAGE_SIZE,
  useTransactionsSearchParams,
} from "@/hooks/search-params";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import type { Transaction } from "../schema";
import { columns } from "./transaction-columns";
import { TransactionsTablePagination } from "./transactions-table-pagination";
import { TransactionsTableToolbar } from "./transactions-table-toolbar";

interface TransactionsTableProps {
  data: Transaction[];
}

export function TransactionsTable({ data }: TransactionsTableProps) {
  const [searchParams, setSearchParams] = useTransactionsSearchParams();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      fee: false,
      country: false,
    });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Derive pagination from URL search params
  const pagination = React.useMemo(
    () => ({
      pageIndex: searchParams.page - 1,
      pageSize: searchParams.perPage,
    }),
    [searchParams.page, searchParams.perPage],
  );

  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    if (searchParams.search) {
      filters.push({ id: "customer", value: searchParams.search });
    }
    if (searchParams.status.length > 0) {
      filters.push({ id: "status", value: searchParams.status });
    }
    if (searchParams.method.length > 0) {
      filters.push({ id: "method", value: searchParams.method });
    }
    if (searchParams.gateway.length > 0) {
      filters.push({ id: "gateway", value: searchParams.gateway });
    }
    return filters;
  }, [
    searchParams.search,
    searchParams.status,
    searchParams.method,
    searchParams.gateway,
  ]);

  // Sync column filter changes back to URL
  const onColumnFiltersChange = React.useCallback(
    (
      updaterOrValue:
        | ColumnFiltersState
        | ((old: ColumnFiltersState) => ColumnFiltersState),
    ) => {
      const newFilters =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnFilters)
          : updaterOrValue;

      const search =
        (newFilters.find((f) => f.id === "customer")?.value as string) || "";
      const status =
        (newFilters.find((f) => f.id === "status")?.value as string[]) || [];
      const method =
        (newFilters.find((f) => f.id === "method")?.value as string[]) || [];
      const gateway =
        (newFilters.find((f) => f.id === "gateway")?.value as string[]) || [];

      setSearchParams({
        search: search || null,
        status: status.length > 0 ? status : null,
        method: method.length > 0 ? method : null,
        gateway: gateway.length > 0 ? gateway : null,
        page: null,
      });
    },
    [columnFilters, setSearchParams],
  );

  // Sync pagination changes back to URL
  const onPaginationChange = React.useCallback(
    (
      updaterOrValue: React.SetStateAction<{
        pageIndex: number;
        pageSize: number;
      }>,
    ) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(pagination)
          : updaterOrValue;

      setSearchParams({
        page:
          newPagination.pageIndex === 0 ? null : newPagination.pageIndex + 1,
        perPage:
          newPagination.pageSize === DEFAULT_PAGE_SIZE
            ? null
            : newPagination.pageSize,
      });
    },
    [pagination, setSearchParams],
  );

  /* eslint-disable-next-line react-hooks/incompatible-library */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange,
    onPaginationChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <TransactionsTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TransactionsTablePagination table={table} />
    </div>
  );
}
