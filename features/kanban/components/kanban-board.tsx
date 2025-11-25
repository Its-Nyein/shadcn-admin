"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useState } from "react";

import { initialTasks } from "../utils/data";
import type { ColumnStatus, KanbanTask } from "../utils/schema";
import { AddTaskDialog } from "./add-task-dialog";
import { KanbanCard } from "./kanban-card";
import { KanbanColumn } from "./kanban-column";

const columns: { id: ColumnStatus; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<ColumnStatus>("todo");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const getTasksByStatus = useCallback(
    (status: ColumnStatus) => tasks.filter((task) => task.status === status),
    [tasks],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overData = over.data.current;

    // If dragging over a column
    if (overData?.type === "column") {
      const newStatus = overData.status as ColumnStatus;
      if (activeTask.status !== newStatus) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeId ? { ...t, status: newStatus } : t,
          ),
        );
      }
      return;
    }

    // If dragging over another task
    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    if (activeTask.status !== overTask.status) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: overTask.status } : t,
        ),
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // If dropping on a task in the same column, reorder
    if (overTask && activeTask.status === overTask.status) {
      setTasks((prev) => {
        const columnTasks = prev.filter((t) => t.status === activeTask.status);
        const otherTasks = prev.filter((t) => t.status !== activeTask.status);

        const activeIndex = columnTasks.findIndex((t) => t.id === activeId);
        const overIndex = columnTasks.findIndex((t) => t.id === overId);

        const reorderedColumnTasks = arrayMove(
          columnTasks,
          activeIndex,
          overIndex,
        );

        return [...otherTasks, ...reorderedColumnTasks];
      });
    }
  };

  const handleAddTask = (status: ColumnStatus) => {
    setDialogStatus(status);
    setDialogOpen(true);
  };

  const handleTaskCreated = (newTask: KanbanTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id)}
              onAddTask={handleAddTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && <KanbanCard task={activeTask} />}
        </DragOverlay>
      </DndContext>

      <AddTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultStatus={dialogStatus}
        onAddTask={handleTaskCreated}
      />
    </>
  );
}
