"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEFAULT_PAGE_SIZE, useTasksSearchParams } from "@/hooks/search-params";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import type { Task } from "../schema";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAddTask?: (task: Task) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAddTask,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useTasksSearchParams();

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Derive pagination from URL search params
  const pagination = React.useMemo(
    () => ({
      pageIndex: searchParams.page - 1,
      pageSize: searchParams.perPage,
    }),
    [searchParams.page, searchParams.perPage],
  );

  // Derive column filters from URL search params
  const columnFilters = React.useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [];
    if (searchParams.search) {
      filters.push({ id: "title", value: searchParams.search });
    }
    if (searchParams.status.length > 0) {
      filters.push({ id: "status", value: searchParams.status });
    }
    if (searchParams.priority.length > 0) {
      filters.push({ id: "priority", value: searchParams.priority });
    }
    return filters;
  }, [searchParams.search, searchParams.status, searchParams.priority]);

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
        (newFilters.find((f) => f.id === "title")?.value as string) || "";
      const status =
        (newFilters.find((f) => f.id === "status")?.value as string[]) || [];
      const priority =
        (newFilters.find((f) => f.id === "priority")?.value as string[]) || [];

      setSearchParams({
        search: search || null,
        status: status.length > 0 ? status : null,
        priority: priority.length > 0 ? priority : null,
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

  /* eslint-disable-next-line */
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
      <DataTableToolbar table={table} onAddTask={onAddTask} />
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
