"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { KanbanTask } from "../utils/schema";
import { statusConfig } from "../utils/schema";

interface KanbanCardProps {
  task: KanbanTask;
}

export function KanbanCard({ task }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const status = statusConfig[task.status];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab py-3 shadow-sm transition-shadow hover:shadow-md",
        isDragging && "opacity-50 shadow-lg",
      )}
    >
      <CardContent className="space-y-3 px-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="flex-1 text-sm font-medium leading-tight">
            {task.title}
          </h4>
          <button
            {...attributes}
            {...listeners}
            className="text-muted-foreground hover:text-foreground shrink-0 cursor-grab touch-none"
          >
            <GripVertical className="size-4" />
          </button>
        </div>

        {task.description && (
          <p className="text-muted-foreground line-clamp-2 text-xs">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {task.assignee && (
              <Avatar className="size-6">
                <AvatarImage
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                />
                <AvatarFallback className="text-[10px]">
                  {getInitials(task.assignee.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className={cn("size-2 rounded-full", status.color)} />
              <span className="text-muted-foreground text-xs">
                {status.label}
              </span>
            </div>

            <Badge variant="outline" className="text-[10px] capitalize">
              {task.priority}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
