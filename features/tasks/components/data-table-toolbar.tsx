"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import type { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import { useCallback, useRef } from "react";
import type { Task } from "../utils/schema";
import { priorities, statuses } from "../utils/task-data";
import { AddTaskModal } from "./add-task-modal";
import { DataTableFacetedFilter } from "./data-table-filtered";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onAddTask?: (task: Task) => void;
}

export function DataTableToolbar<TData>({
  table,
  onAddTask,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const filterValue =
    (table.getColumn("title")?.getFilterValue() as string) ?? "";

  const [searchValue, handleSearchChange] = useDebouncedCallback(
    filterValue,
    (value) => table.getColumn("title")?.setFilterValue(value || undefined),
  );

  const searchRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts({
    onFocusSearch: useCallback(() => searchRef.current?.focus(), []),
    onClearFilters: useCallback(() => table.resetColumnFilters(), [table]),
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            placeholder="Search by title... ( / )"
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
            className="h-9 w-[200px] pl-8 lg:w-[280px]"
          />
        </div>
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-3"
          >
            Reset
            <X className="ml-1 size-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <AddTaskModal onAddTask={onAddTask} />
      </div>
    </div>
  );
}
