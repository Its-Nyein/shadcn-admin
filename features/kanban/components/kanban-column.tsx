"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import type { ColumnStatus, KanbanTask } from "../utils/schema";
import { KanbanCard } from "./kanban-card";

interface KanbanColumnProps {
  id: ColumnStatus;
  title: string;
  tasks: KanbanTask[];
  onAddTask: (status: ColumnStatus) => void;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  onAddTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "column",
      status: id,
    },
  });

  return (
    <div
      className={cn(
        "bg-muted/40 flex h-full w-80 shrink-0 flex-col rounded-lg border",
        isOver && "ring-primary ring-2",
      )}
    >
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{title}</h3>
          <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-7"
          onClick={() => onAddTask(id)}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 pt-2">
        <div
          ref={setNodeRef}
          className="flex min-h-[200px] flex-col gap-2 pb-2"
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <KanbanCard key={task.id} task={task} />
            ))}
          </SortableContext>
          {tasks.length === 0 && (
            <div className="text-muted-foreground flex h-24 items-center justify-center rounded-lg border-2 border-dashed text-sm">
              No tasks yet
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
